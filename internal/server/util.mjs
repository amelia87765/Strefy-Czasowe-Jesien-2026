export const EMAIL_MAX = 254;
export const PASSWORD_MIN = 10;
export const PASSWORD_MAX = 200;
export const NAME_MAX = 80;
export const TITLE_MAX = 120;
export const BODY_LIMIT = 32_768;

export function json(response, status, body, extraHeaders = {}) {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  });
  response.end(payload);
}

export function readJson(request, limit = BODY_LIMIT) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        const error = new Error('too_large');
        error.status = 413;
        reject(error);
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => {
      if (!size) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        const error = new Error('invalid_json');
        error.status = 400;
        reject(error);
      }
    });
    request.on('error', reject);
  });
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(value);
    } catch {
      out[key] = value;
    }
  }
  return out;
}

export function clientIp(request, trustProxy) {
  if (trustProxy) {
    const forwarded = request.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.trim()) {
      return forwarded.split(',')[0].trim();
    }
  }
  return request.socket.remoteAddress || 'unknown';
}

export function normalizeLogin(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

export const normalizeEmail = normalizeLogin;

export function isLogin(value) {
  if (!value || value.length < 2 || value.length > EMAIL_MAX) return false;
  if (/\s/.test(value)) return false;
  return true;
}

export function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function warsawToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Warsaw' });
}

export function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    mustChangePassword: Number(row.must_change_password) !== 0,
    active: row.active === undefined ? true : Boolean(row.active),
  };
}

const EMBED_HOSTS = new Set([
  'docs.google.com',
  'drive.google.com',
  'forms.google.com',
  'www.google.com',
]);

export function isAllowedEmbedUrl(value) {
  let url;
  try {
    url = new URL(String(value ?? '').trim());
  } catch {
    return false;
  }
  return url.protocol === 'https:' && EMBED_HOSTS.has(url.hostname);
}

export const RESOURCE_TYPES = new Set(['form', 'sheet', 'drive']);
export const ROLES = new Set(['admin', 'member']);
