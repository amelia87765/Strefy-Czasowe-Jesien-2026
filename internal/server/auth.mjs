import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PASSWORD_MAX, PASSWORD_MIN, parseCookies } from './util.mjs';

const scryptAsync = promisify(scrypt);
const N = 16_384;
const r = 8;
const p = 1;
const KEYLEN = 32;
export const COOKIE = 'ssid';
export const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, KEYLEN, { N, r, p });
  return `scrypt$${N}$${r}$${p}$${salt.toString('base64url')}$${Buffer.from(hash).toString('base64url')}`;
}

export async function verifyPassword(password, stored) {
  const parts = String(stored ?? '').split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const cost = Number(parts[1]);
  const block = Number(parts[2]);
  const parallel = Number(parts[3]);
  if (!Number.isFinite(cost) || !Number.isFinite(block) || !Number.isFinite(parallel)) return false;
  let salt;
  let expected;
  try {
    salt = Buffer.from(parts[4], 'base64url');
    expected = Buffer.from(parts[5], 'base64url');
  } catch {
    return false;
  }
  if (!salt.length || !expected.length) return false;
  const hash = await scryptAsync(password, salt, expected.length, { N: cost, r: block, p: parallel });
  if (hash.length !== expected.length) return false;
  return timingSafeEqual(hash, expected);
}

export function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

export function newSessionToken() {
  return randomBytes(32).toString('base64url');
}

export function cookieHeader(token, { secure, maxAge } = {}) {
  const parts = [
    `${COOKIE}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'SameSite=Strict',
    'Path=/',
  ];
  if (maxAge !== undefined) parts.push(`Max-Age=${maxAge}`);
  else parts.push(`Max-Age=${Math.floor(SESSION_MS / 1000)}`);
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function clearCookieHeader(secure) {
  return cookieHeader('', { secure, maxAge: 0 });
}

export function cookieToken(request) {
  return parseCookies(request.headers.cookie)[COOKIE] || '';
}

export function rateKey(ip, email) {
  return `${ip}\n${email}`;
}

export function isRateLimited(key) {
  const now = Date.now();
  const row = attempts.get(key);
  if (!row || row.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  row.count += 1;
  return row.count > MAX_ATTEMPTS;
}

export function clearRateLimit(key) {
  attempts.delete(key);
}

export function validNewPassword(password) {
  return typeof password === 'string' && password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX;
}

export function requestSecure(request, trustProxy) {
  if (process.env.INTERNAL_SECURE === '1') return true;
  if (process.env.INTERNAL_SECURE === '0') return false;
  if (trustProxy && request.headers['x-forwarded-proto'] === 'https') return true;
  return Boolean(request.socket.encrypted);
}
