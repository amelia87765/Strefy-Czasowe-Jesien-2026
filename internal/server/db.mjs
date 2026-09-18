import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { hashPassword } from './auth.mjs';
import { normalizeEmail } from './util.mjs';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
  must_change_password INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK (type IN ('form', 'sheet', 'drive')),
  title TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_resources (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, resource_id)
);

CREATE TABLE IF NOT EXISTS day_marks (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'confirmed')),
  PRIMARY KEY (user_id, date)
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_day_marks_date ON day_marks(date);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
`;

export function openDatabase(dbPath) {
  if (dbPath !== ':memory:') mkdirSync(dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec('PRAGMA foreign_keys = ON');
  if (dbPath !== ':memory:') db.exec('PRAGMA journal_mode = WAL');
  db.exec(SCHEMA);
  return db;
}

export async function bootstrapAdmin(db, email, password, name = 'Admin') {
  const count = db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
  if (count > 0) return false;
  const normalized = normalizeEmail(email);
  if (!normalized || !password) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || password.length < 10 || password.length > 200) {
    return false;
  }
  const password_hash = await hashPassword(password);
  db.prepare(
    `INSERT INTO users (email, name, password_hash, role, must_change_password, active)
     VALUES (?, ?, ?, 'admin', 0, 1)`,
  ).run(normalized, String(name || 'Admin').slice(0, 80), password_hash);
  return true;
}

export function purgeSessions(db) {
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());
}

export function getUserByEmail(db, email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(normalizeEmail(email)) ?? null;
}

export function getUserById(db, id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) ?? null;
}

export function createSession(db, userId, tokenHash, expiresAt) {
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(
    tokenHash,
    userId,
    expiresAt,
  );
}

export function deleteSession(db, tokenHash) {
  db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
}

export function getSessionUser(db, tokenHash) {
  const row = db
    .prepare(
      `SELECT users.* FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token_hash = ? AND sessions.expires_at > ? AND users.active = 1`,
    )
    .get(tokenHash, Date.now());
  return row ?? null;
}

export function adminCount(db) {
  return db.prepare("SELECT COUNT(*) AS n FROM users WHERE role = 'admin' AND active = 1").get().n;
}
