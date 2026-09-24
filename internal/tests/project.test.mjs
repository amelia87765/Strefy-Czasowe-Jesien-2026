import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { translations } from '../src/translations.js';
import { createAppServer } from '../server.mjs';
import { bootstrapAdmin, openDatabase } from '../server/db.mjs';
import { hashPassword } from '../server/auth.mjs';

test('Both languages cover the same UI and state messages', () => {
  assert.deepEqual(Object.keys(translations.pl).sort(), Object.keys(translations.en).sort());
  assert.equal(translations.pl.network, 'SIEĆ WEWNĘTRZNA');
  assert.equal(translations.en.network, 'INTRANET');
  for (const messages of Object.values(translations)) {
    for (const value of Object.values(messages)) assert.ok(String(value).trim());
  }
});

function cookieHeader(response) {
  const list =
    typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie()
      : [response.headers.get('set-cookie')].filter(Boolean);
  const line = list.find((value) => value.startsWith('ssid='));
  return line ? line.split(';')[0] : '';
}

async function listen(server) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  await server.locals.ready;
  return `http://127.0.0.1:${server.address().port}`;
}

async function close(server) {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  server.locals.db.close();
}

async function setup({ member = false } = {}) {
  const dir = await mkdtemp(join(tmpdir(), 'smooth-sail-'));
  const staticRoot = join(dir, 'dist');
  await mkdir(staticRoot);
  await writeFile(join(staticRoot, 'index.html'), '<div id="root"></div>');
  const dbPath = join(dir, 'app.sqlite');
  const db = openDatabase(dbPath);
  await bootstrapAdmin(db, 'admin@test.com', 'admin-pass-1', 'Admin');
  if (member) {
    db.prepare(
      `INSERT INTO users (email, name, password_hash, role, must_change_password, active)
       VALUES (?, ?, ?, 'member', 0, 1)`,
    ).run('crew@test.com', 'Crew', await hashPassword('crew-pass-1'));
  }
  const server = createAppServer({ db, dbPath, root: staticRoot, skipBootstrap: true });
  const base = await listen(server);
  return { server, base, db };
}

async function login(base, email, password) {
  const response = await fetch(`${base}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return { response, cookie: cookieHeader(response), data: await response.json() };
}

test('Node serves the built page and rejects credential posts to static paths', async () => {
  const { server, base } = await setup();
  try {
    const page = await fetch(base);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /<div id="root"><\/div>/);
    assert.equal(page.headers.get('x-content-type-options'), 'nosniff');
    assert.equal((await fetch(`${base}/`, { method: 'POST', body: 'test' })).status, 405);
    assert.equal((await fetch(`${base}/package.json`)).status, 404);
    assert.equal((await fetch(`${base}/..%2fpackage.json`)).status, 403);
    assert.equal((await fetch(`${base}/api/me`)).status, 401);
  } finally {
    await close(server);
  }
});

test('Login sets an HttpOnly session cookie and /api/me requires it', async () => {
  const { server, base } = await setup();
  try {
    const wrong = await login(base, 'admin@test.com', 'nope-nope-nope');
    assert.equal(wrong.response.status, 401);
    assert.equal(wrong.data.error, 'invalid_credentials');
    const ok = await login(base, 'admin@test.com', 'admin-pass-1');
    assert.equal(ok.response.status, 200);
    assert.equal(ok.data.user.email, 'admin@test.com');
    assert.match(ok.response.headers.get('set-cookie') || '', /HttpOnly/i);
    assert.equal(ok.data.user.password_hash, undefined);
    const me = await fetch(`${base}/api/me`, { headers: { Cookie: ok.cookie } });
    assert.equal(me.status, 200);
    assert.equal((await me.json()).user.role, 'admin');
  } finally {
    await close(server);
  }
});

test('Members cannot list users; unconfirmed availability is hidden from other members', async () => {
  const { server, base, db } = await setup({ member: true });
  try {
    const admin = await login(base, 'admin@test.com', 'admin-pass-1');
    const crew = await login(base, 'crew@test.com', 'crew-pass-1');
    assert.equal((await fetch(`${base}/api/users`, { headers: { Cookie: crew.cookie } })).status, 403);

    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const last = new Date(y, now.getMonth() + 1, 0).getDate();
    const date = `${y}-${m}-${String(last).padStart(2, '0')}`;

    const mark = await fetch(`${base}/api/calendar/availability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: crew.cookie },
      body: JSON.stringify({ date }),
    });
    assert.equal(mark.status, 200);

    const memberView = await (
      await fetch(`${base}/api/calendar?year=${y}&month=${Number(m)}`, { headers: { Cookie: crew.cookie } })
    ).json();
    assert.equal(memberView.marks.some((row) => row.date === date && row.status === 'available'), true);

    db.prepare(
      `INSERT INTO users (email, name, password_hash, role, must_change_password, active)
       VALUES (?, ?, ?, 'member', 0, 1)`,
    ).run('other@test.com', 'Other', await hashPassword('other-pass1'));
    const other = await login(base, 'other@test.com', 'other-pass1');
    const otherView = await (
      await fetch(`${base}/api/calendar?year=${y}&month=${Number(m)}`, { headers: { Cookie: other.cookie } })
    ).json();
    assert.equal(
      otherView.marks.some((row) => row.date === date && row.status === 'available'),
      false,
    );

    const crewUser = db.prepare('SELECT id FROM users WHERE email = ?').get('crew@test.com');
    const confirm = await fetch(`${base}/api/calendar/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: admin.cookie },
      body: JSON.stringify({ userId: crewUser.id, date, confirmed: true }),
    });
    assert.equal(confirm.status, 200);
    const after = await (
      await fetch(`${base}/api/calendar?year=${y}&month=${Number(m)}`, { headers: { Cookie: other.cookie } })
    ).json();
    assert.equal(after.marks.some((row) => row.date === date && row.status === 'confirmed'), true);
  } finally {
    await close(server);
  }
});

test('Resources are assigned per account and embed URLs are restricted to Google hosts', async () => {
  const { server, base, db } = await setup({ member: true });
  try {
    const admin = await login(base, 'admin@test.com', 'admin-pass-1');
    const crew = await login(base, 'crew@test.com', 'crew-pass-1');
    const bad = await fetch(`${base}/api/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: admin.cookie },
      body: JSON.stringify({ type: 'form', title: 'Nope', embedUrl: 'https://example.com/x' }),
    });
    assert.equal(bad.status, 400);
    const created = await fetch(`${base}/api/resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: admin.cookie },
      body: JSON.stringify({
        type: 'sheet',
        title: 'Roster',
        embedUrl: 'https://docs.google.com/spreadsheets/d/e/test/pubhtml',
      }),
    });
    assert.equal(created.status, 201);
    const resource = await created.json();
    const crewUser = db.prepare('SELECT id FROM users WHERE email = ?').get('crew@test.com');
    await fetch(`${base}/api/users/${crewUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Cookie: admin.cookie },
      body: JSON.stringify({ resourceIds: [resource.id] }),
    });
    const crewResources = await (await fetch(`${base}/api/resources`, { headers: { Cookie: crew.cookie } })).json();
    assert.equal(crewResources.resources.length, 1);
    assert.equal(crewResources.resources[0].title, 'Roster');
  } finally {
    await close(server);
  }
});

test('Login accepts a username without @; first login can set a new password without the temporary one', async () => {
  const { server, base, db } = await setup();
  try {
    const admin = await login(base, 'admin@test.com', 'admin-pass-1');
    const created = await fetch(`${base}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: admin.cookie },
      body: JSON.stringify({
        email: 'kormoran',
        name: 'Kormoran',
        password: 'temporary1',
        role: 'member',
        resourceIds: [],
      }),
    });
    assert.equal(created.status, 201);
    const account = await created.json();
    assert.equal(account.user.email, 'kormoran');
    assert.equal(account.user.mustChangePassword, true);

    const first = await login(base, 'kormoran', 'temporary1');
    assert.equal(first.response.status, 200);
    assert.equal(first.data.user.mustChangePassword, true);

    const changed = await fetch(`${base}/api/password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: first.cookie },
      body: JSON.stringify({ newPassword: 'own-secret-1' }),
    });
    assert.equal(changed.status, 200);
    const after = await changed.json();
    assert.equal(after.user.mustChangePassword, false);

    const me = await fetch(`${base}/api/me`, { headers: { Cookie: first.cookie } });
    assert.equal((await me.json()).user.mustChangePassword, false);

    const again = await login(base, 'Kormoran', 'own-secret-1');
    assert.equal(again.response.status, 200);
    assert.equal(again.data.user.email, 'kormoran');

    const row = db.prepare('SELECT must_change_password FROM users WHERE email = ?').get('kormoran');
    assert.equal(Number(row.must_change_password), 0);
  } finally {
    await close(server);
  }
});
