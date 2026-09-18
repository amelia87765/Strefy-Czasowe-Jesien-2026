import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleApi } from './server/api.mjs';
import { validNewPassword } from './server/auth.mjs';
import { bootstrapAdmin, openDatabase } from './server/db.mjs';
import { loadEnvFile } from './server/env.mjs';
import { isEmail, json } from './server/util.mjs';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
loadEnvFile(rootDir);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://docs.google.com https://drive.google.com https://forms.google.com https://www.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
};

function applySecurity(response) {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.setHeader(key, value);
  }
}

export function createAppServer(options = {}) {
  const dbPath = options.dbPath ?? resolve(rootDir, 'data', 'app.sqlite');
  const staticRoot = resolve(options.root ?? resolve(rootDir, 'dist')) + sep;
  const apiOnly = Boolean(options.apiOnly ?? process.env.INTERNAL_API_ONLY === '1');
  const trustProxy = Boolean(options.trustProxy ?? process.env.INTERNAL_TRUST_PROXY === '1');
  const db = options.db ?? openDatabase(dbPath);
  const ready = options.skipBootstrap
    ? Promise.resolve(false)
    : bootstrapAdmin(
        db,
        process.env.INTERNAL_BOOTSTRAP_EMAIL,
        process.env.INTERNAL_BOOTSTRAP_PASSWORD,
        process.env.INTERNAL_BOOTSTRAP_NAME || 'Admin',
      ).then((created) => {
        if (created) console.log('Smooth Sail: created bootstrap admin');
        else if (db.prepare('SELECT COUNT(*) AS n FROM users').get().n === 0) {
          const email = process.env.INTERNAL_BOOTSTRAP_EMAIL;
          const password = process.env.INTERNAL_BOOTSTRAP_PASSWORD;
          if (!email || !password || !isEmail(email) || !validNewPassword(password)) {
            console.warn(
              'Smooth Sail: empty database. Set INTERNAL_BOOTSTRAP_EMAIL and INTERNAL_BOOTSTRAP_PASSWORD (min. 10 characters) in .env',
            );
          }
        }
        return created;
      });

  const server = createServer(async (request, response) => {
    applySecurity(response);
    try {
      await ready;
      if (await handleApi(request, response, { db, trustProxy })) return;
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD, POST, PATCH, DELETE' });
        response.end();
        return;
      }
      if (apiOnly) {
        json(response, 404, { error: 'not_found' });
        return;
      }
      let path;
      try {
        path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      } catch {
        response.writeHead(400);
        response.end();
        return;
      }
      if (path.includes('\0')) {
        response.writeHead(400);
        response.end();
        return;
      }
      const requested = path === '/' ? '/index.html' : path;
      const file = resolve(staticRoot, '.' + requested);
      if (!file.startsWith(staticRoot)) {
        response.writeHead(403);
        response.end();
        return;
      }
      const sendFile = async (target, fallbackIndex = false) => {
        const info = await stat(target);
        if (!info.isFile()) throw new Error('Not a file');
        response.writeHead(200, {
          'Content-Type': types[extname(target)] || 'application/octet-stream',
          'Content-Length': info.size,
          'Cache-Control': fallbackIndex || target.endsWith('index.html') || extname(target) === '.html' ? 'no-store' : 'no-cache',
        });
        if (request.method === 'HEAD') {
          response.end();
          return;
        }
        createReadStream(target).on('error', () => response.destroy()).pipe(response);
      };
      try {
        await sendFile(file);
      } catch {
        if (extname(requested)) {
          response.writeHead(404);
          response.end('Not found');
          return;
        }
        try {
          await sendFile(resolve(staticRoot, 'index.html'), true);
        } catch {
          response.writeHead(404);
          response.end('Not found');
        }
      }
    } catch (err) {
      console.error(err);
      if (!response.headersSent) json(response, 500, { error: 'server_error' });
    }
  });

  server.locals = { db, ready };
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || '127.0.0.1';
  createAppServer().listen(port, host, () => {
    console.log(`Smooth Sail: http://${host}:${port}`);
  });
}
