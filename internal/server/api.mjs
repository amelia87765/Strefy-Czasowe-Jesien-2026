import {
  clearCookieHeader,
  clearRateLimit,
  cookieHeader,
  cookieToken,
  hashToken,
  isRateLimited,
  newSessionToken,
  rateKey,
  requestSecure,
  SESSION_MS,
  validNewPassword,
  verifyPassword,
  hashPassword,
} from './auth.mjs';
import {
  adminCount,
  createSession,
  deleteSession,
  getSessionUser,
  getUserByEmail,
  getUserById,
  purgeSessions,
} from './db.mjs';
import {
  NAME_MAX,
  TITLE_MAX,
  clientIp,
  isAllowedEmbedUrl,
  isIsoDate,
  isLogin,
  json,
  normalizeLogin,
  publicUser,
  readJson,
  RESOURCE_TYPES,
  ROLES,
  warsawToday,
} from './util.mjs';

function error(response, status, code) {
  json(response, status, { error: code });
}

async function body(request, response) {
  try {
    return await readJson(request);
  } catch (err) {
    error(response, err.status || 400, err.message === 'too_large' ? 'too_large' : 'invalid_json');
    return null;
  }
}

function sessionCookie(request, token, trustProxy) {
  return cookieHeader(token, { secure: requestSecure(request, trustProxy) });
}

function requireUser(db, request, response, { allowPasswordChange = false } = {}) {
  purgeSessions(db);
  const token = cookieToken(request);
  if (!token) {
    error(response, 401, 'unauthorized');
    return null;
  }
  const user = getSessionUser(db, hashToken(token));
  if (!user) {
    error(response, 401, 'unauthorized');
    return null;
  }
  if (user.must_change_password && !allowPasswordChange) {
    error(response, 403, 'password_change_required');
    return null;
  }
  return user;
}

function requireAdmin(db, request, response) {
  const user = requireUser(db, request, response);
  if (!user) return null;
  if (user.role !== 'admin') {
    error(response, 403, 'forbidden');
    return null;
  }
  return user;
}

function monthRange(year, month) {
  const y = Number(year);
  const m = Number(month);
  if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12 || y < 2000 || y > 2100) {
    return null;
  }
  const start = `${y}-${String(m).padStart(2, '0')}-01`;
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const end = `${y}-${String(m).padStart(2, '0')}-${String(last).padStart(2, '0')}`;
  return { start, end };
}

function resourceIdsFor(db, userId) {
  return db
    .prepare('SELECT resource_id AS id FROM user_resources WHERE user_id = ?')
    .all(userId)
    .map((row) => row.id);
}

function mapResource(row) {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    embedUrl: row.embed_url,
    sortOrder: row.sort_order,
  };
}

function setUserResources(db, userId, resourceIds) {
  db.prepare('DELETE FROM user_resources WHERE user_id = ?').run(userId);
  const insert = db.prepare('INSERT INTO user_resources (user_id, resource_id) VALUES (?, ?)');
  for (const id of resourceIds) {
    const exists = db.prepare('SELECT id FROM resources WHERE id = ?').get(id);
    if (exists) insert.run(userId, id);
  }
}

function parseResourceIds(value) {
  if (value == null) return [];
  if (!Array.isArray(value)) return null;
  const ids = [];
  for (const item of value) {
    const id = Number(item);
    if (!Number.isInteger(id) || id < 1) return null;
    ids.push(id);
  }
  return [...new Set(ids)];
}

export async function handleApi(request, response, { db, trustProxy }) {
  let url;
  try {
    url = new URL(request.url, 'http://localhost');
  } catch {
    error(response, 400, 'bad_request');
    return true;
  }
  const path = url.pathname;
  const method = request.method || 'GET';
  if (!path.startsWith('/api/')) return false;

  if (method === 'POST' && path === '/api/login') {
    const data = await body(request, response);
    if (!data) return true;
    const email = normalizeLogin(data.email);
    const password = typeof data.password === 'string' ? data.password : '';
    const ip = clientIp(request, trustProxy);
    const key = rateKey(ip, email || ip);
    if (isRateLimited(key)) {
      error(response, 429, 'rate_limited');
      return true;
    }
    const user = isLogin(email) ? getUserByEmail(db, email) : null;
    const ok = user && user.active && password && (await verifyPassword(password, user.password_hash));
    if (!ok) {
      error(response, 401, 'invalid_credentials');
      return true;
    }
    clearRateLimit(key);
    purgeSessions(db);
    const token = newSessionToken();
    createSession(db, user.id, hashToken(token), Date.now() + SESSION_MS);
    json(response, 200, { user: publicUser(user) }, { 'Set-Cookie': sessionCookie(request, token, trustProxy) });
    return true;
  }

  if (method === 'POST' && path === '/api/logout') {
    const token = cookieToken(request);
    if (token) deleteSession(db, hashToken(token));
    json(
      response,
      200,
      { ok: true },
      { 'Set-Cookie': clearCookieHeader(requestSecure(request, trustProxy)) },
    );
    return true;
  }

  if (method === 'GET' && path === '/api/me') {
    const user = requireUser(db, request, response, { allowPasswordChange: true });
    if (!user) return true;
    json(response, 200, { user: publicUser(user) });
    return true;
  }

  if (method === 'POST' && path === '/api/password') {
    const user = requireUser(db, request, response, { allowPasswordChange: true });
    if (!user) return true;
    const data = await body(request, response);
    if (!data) return true;
    const current = typeof data.currentPassword === 'string' ? data.currentPassword : '';
    const next = typeof data.newPassword === 'string' ? data.newPassword : '';
    if (!validNewPassword(next)) {
      error(response, 400, 'password_invalid');
      return true;
    }
    const forced = Number(user.must_change_password) !== 0;
    if (!forced && !(await verifyPassword(current, user.password_hash))) {
      error(response, 401, 'invalid_credentials');
      return true;
    }
    db.prepare('UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?').run(
      await hashPassword(next),
      user.id,
    );
    json(response, 200, { user: publicUser({ ...getUserById(db, user.id), must_change_password: 0 }) });
    return true;
  }

  if (method === 'GET' && path === '/api/calendar') {
    const user = requireUser(db, request, response);
    if (!user) return true;
    const range = monthRange(url.searchParams.get('year'), url.searchParams.get('month'));
    if (!range) {
      error(response, 400, 'invalid_month');
      return true;
    }
    const people = db.prepare('SELECT id, name FROM users WHERE active = 1 ORDER BY name COLLATE NOCASE').all();
    const marks = db
      .prepare(
        `SELECT user_id AS userId, date, status FROM day_marks
         WHERE date >= ? AND date <= ?`,
      )
      .all(range.start, range.end)
      .filter((mark) => mark.status === 'confirmed' || mark.userId === user.id || user.role === 'admin');
    const events = db
      .prepare(
        `SELECT id, date, title, description FROM events
         WHERE date >= ? AND date <= ? ORDER BY date, id`,
      )
      .all(range.start, range.end);
    json(response, 200, { users: people, marks, events });
    return true;
  }

  if (method === 'POST' && path === '/api/calendar/availability') {
    const user = requireUser(db, request, response);
    if (!user) return true;
    const data = await body(request, response);
    if (!data) return true;
    const date = String(data.date ?? '');
    if (!isIsoDate(date) || date < warsawToday()) {
      error(response, 400, 'invalid_date');
      return true;
    }
    const existing = db.prepare('SELECT status FROM day_marks WHERE user_id = ? AND date = ?').get(user.id, date);
    if (existing?.status === 'confirmed') {
      error(response, 403, 'already_confirmed');
      return true;
    }
    if (existing) {
      db.prepare('DELETE FROM day_marks WHERE user_id = ? AND date = ?').run(user.id, date);
      json(response, 200, { date, status: null });
      return true;
    }
    db.prepare('INSERT INTO day_marks (user_id, date, status) VALUES (?, ?, ?)').run(user.id, date, 'available');
    json(response, 200, { date, status: 'available' });
    return true;
  }

  if (method === 'POST' && path === '/api/calendar/confirm') {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const data = await body(request, response);
    if (!data) return true;
    const date = String(data.date ?? '');
    const userId = Number(data.userId);
    const confirmed = Boolean(data.confirmed);
    if (!isIsoDate(date) || !Number.isInteger(userId)) {
      error(response, 400, 'invalid_date');
      return true;
    }
    const target = getUserById(db, userId);
    if (!target || !target.active) {
      error(response, 404, 'not_found');
      return true;
    }
    if (confirmed) {
      db.prepare(
        `INSERT INTO day_marks (user_id, date, status) VALUES (?, ?, 'confirmed')
         ON CONFLICT(user_id, date) DO UPDATE SET status = 'confirmed'`,
      ).run(userId, date);
      json(response, 200, { date, userId, status: 'confirmed' });
      return true;
    }
    const existing = db.prepare('SELECT status FROM day_marks WHERE user_id = ? AND date = ?').get(userId, date);
    if (!existing) {
      json(response, 200, { date, userId, status: null });
      return true;
    }
    db.prepare("UPDATE day_marks SET status = 'available' WHERE user_id = ? AND date = ?").run(userId, date);
    json(response, 200, { date, userId, status: 'available' });
    return true;
  }

  if (method === 'POST' && path === '/api/calendar/events') {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const data = await body(request, response);
    if (!data) return true;
    const date = String(data.date ?? '');
    const title = String(data.title ?? '').trim();
    const description = String(data.description ?? '').trim();
    if (!isIsoDate(date) || !title || title.length > TITLE_MAX || description.length > 500) {
      error(response, 400, 'invalid_event');
      return true;
    }
    const result = db
      .prepare('INSERT INTO events (date, title, description, created_by) VALUES (?, ?, ?, ?)')
      .run(date, title, description, admin.id);
    json(response, 201, { id: Number(result.lastInsertRowid), date, title, description });
    return true;
  }

  const eventMatch = path.match(/^\/api\/calendar\/events\/(\d+)$/);
  if (method === 'DELETE' && eventMatch) {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const id = Number(eventMatch[1]);
    const row = db.prepare('SELECT id FROM events WHERE id = ?').get(id);
    if (!row) {
      error(response, 404, 'not_found');
      return true;
    }
    db.prepare('DELETE FROM events WHERE id = ?').run(id);
    json(response, 200, { ok: true });
    return true;
  }

  if (method === 'GET' && path === '/api/resources') {
    const user = requireUser(db, request, response);
    if (!user) return true;
    const rows =
      user.role === 'admin'
        ? db.prepare('SELECT * FROM resources ORDER BY sort_order, id').all()
        : db
            .prepare(
              `SELECT resources.* FROM resources
               JOIN user_resources ON user_resources.resource_id = resources.id
               WHERE user_resources.user_id = ?
               ORDER BY resources.sort_order, resources.id`,
            )
            .all(user.id);
    json(response, 200, { resources: rows.map(mapResource) });
    return true;
  }

  if (method === 'POST' && path === '/api/resources') {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const data = await body(request, response);
    if (!data) return true;
    const type = String(data.type ?? '');
    const title = String(data.title ?? '').trim();
    const embedUrl = String(data.embedUrl ?? '').trim();
    if (!RESOURCE_TYPES.has(type) || !title || title.length > TITLE_MAX || !isAllowedEmbedUrl(embedUrl)) {
      error(response, 400, 'invalid_resource');
      return true;
    }
    const max = db.prepare('SELECT COALESCE(MAX(sort_order), 0) AS n FROM resources').get().n;
    const result = db
      .prepare('INSERT INTO resources (type, title, embed_url, sort_order) VALUES (?, ?, ?, ?)')
      .run(type, title, embedUrl, max + 1);
    json(response, 201, mapResource({ id: Number(result.lastInsertRowid), type, title, embed_url: embedUrl, sort_order: max + 1 }));
    return true;
  }

  const resourceMatch = path.match(/^\/api\/resources\/(\d+)$/);
  if (resourceMatch && (method === 'PATCH' || method === 'DELETE')) {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const id = Number(resourceMatch[1]);
    const row = db.prepare('SELECT * FROM resources WHERE id = ?').get(id);
    if (!row) {
      error(response, 404, 'not_found');
      return true;
    }
    if (method === 'DELETE') {
      db.prepare('DELETE FROM resources WHERE id = ?').run(id);
      json(response, 200, { ok: true });
      return true;
    }
    const data = await body(request, response);
    if (!data) return true;
    const type = data.type == null ? row.type : String(data.type);
    const title = data.title == null ? row.title : String(data.title).trim();
    const embedUrl = data.embedUrl == null ? row.embed_url : String(data.embedUrl).trim();
    if (!RESOURCE_TYPES.has(type) || !title || title.length > TITLE_MAX || !isAllowedEmbedUrl(embedUrl)) {
      error(response, 400, 'invalid_resource');
      return true;
    }
    db.prepare('UPDATE resources SET type = ?, title = ?, embed_url = ? WHERE id = ?').run(type, title, embedUrl, id);
    json(response, 200, mapResource({ ...row, type, title, embed_url: embedUrl }));
    return true;
  }

  if (method === 'GET' && path === '/api/users') {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const users = db
      .prepare('SELECT id, email, name, role, must_change_password, active FROM users ORDER BY name COLLATE NOCASE')
      .all()
      .map((row) => ({ ...publicUser(row), resourceIds: resourceIdsFor(db, row.id) }));
    json(response, 200, { users });
    return true;
  }

  if (method === 'POST' && path === '/api/users') {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const data = await body(request, response);
    if (!data) return true;
    const email = normalizeLogin(data.email);
    const name = String(data.name ?? '').trim();
    const password = typeof data.password === 'string' ? data.password : '';
    const role = data.role == null ? 'member' : String(data.role);
    const resourceIds = parseResourceIds(data.resourceIds);
    if (!isLogin(email) || !name || name.length > NAME_MAX || !validNewPassword(password) || !ROLES.has(role) || !resourceIds) {
      error(response, 400, 'invalid_user');
      return true;
    }
    if (getUserByEmail(db, email)) {
      error(response, 409, 'email_taken');
      return true;
    }
    const result = db
      .prepare(
        `INSERT INTO users (email, name, password_hash, role, must_change_password, active)
         VALUES (?, ?, ?, ?, 1, 1)`,
      )
      .run(email, name, await hashPassword(password), role);
    const id = Number(result.lastInsertRowid);
    setUserResources(db, id, resourceIds);
    json(response, 201, { user: { ...publicUser(getUserById(db, id)), resourceIds } });
    return true;
  }

  const userMatch = path.match(/^\/api\/users\/(\d+)$/);
  if (method === 'PATCH' && userMatch) {
    const admin = requireAdmin(db, request, response);
    if (!admin) return true;
    const id = Number(userMatch[1]);
    const target = getUserById(db, id);
    if (!target) {
      error(response, 404, 'not_found');
      return true;
    }
    const data = await body(request, response);
    if (!data) return true;
    let name = target.name;
    let role = target.role;
    let active = target.active;
    if (data.name != null) {
      name = String(data.name).trim();
      if (!name || name.length > NAME_MAX) {
        error(response, 400, 'invalid_user');
        return true;
      }
    }
    if (data.role != null) {
      role = String(data.role);
      if (!ROLES.has(role)) {
        error(response, 400, 'invalid_user');
        return true;
      }
    }
    if (data.active != null) active = data.active ? 1 : 0;
    if (id === admin.id && (role !== 'admin' || !active)) {
      error(response, 400, 'cannot_demote_self');
      return true;
    }
    if (target.role === 'admin' && (role !== 'admin' || !active) && adminCount(db) <= 1) {
      error(response, 400, 'last_admin');
      return true;
    }
    db.prepare('UPDATE users SET name = ?, role = ?, active = ? WHERE id = ?').run(name, role, active, id);
    if (!active) db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id);
    if (data.resourceIds !== undefined) {
      const resourceIds = parseResourceIds(data.resourceIds);
      if (!resourceIds) {
        error(response, 400, 'invalid_user');
        return true;
      }
      setUserResources(db, id, resourceIds);
    }
    if (data.password) {
      if (!validNewPassword(data.password)) {
        error(response, 400, 'password_invalid');
        return true;
      }
      db.prepare('UPDATE users SET password_hash = ?, must_change_password = 1 WHERE id = ?').run(
        await hashPassword(data.password),
        id,
      );
      db.prepare('DELETE FROM sessions WHERE user_id = ?').run(id);
    }
    const updated = getUserById(db, id);
    json(response, 200, { user: { ...publicUser(updated), resourceIds: resourceIdsFor(db, id) } });
    return true;
  }

  error(response, 404, 'not_found');
  return true;
}
