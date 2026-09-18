import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const cwd = fileURLToPath(new URL('.', import.meta.url));
const require = createRequire(import.meta.url);
const children = [];

function run(scriptPath, { nodeArgs = [], args = [], env = {} } = {}) {
  const child = spawn(process.execPath, [...nodeArgs, scriptPath, ...args], {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
  children.push(child);
  child.on('exit', (code, signal) => {
    if (signal) return;
    if (code) stop(code);
  });
  return child;
}

function stop(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(code);
}

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

run(fileURLToPath(new URL('./server.mjs', import.meta.url)), {
  nodeArgs: ['--experimental-sqlite'],
  env: {
    INTERNAL_API_ONLY: '1',
    PORT: process.env.API_PORT || '3000',
    HOST: process.env.HOST || '127.0.0.1',
  },
});

let viteEntry;
try {
  viteEntry = require.resolve('vite/bin/vite.js');
} catch {
  console.error('Vite is not installed. Run npm install from the repository root.');
  stop(1);
}

run(viteEntry, { args: ['--host', '127.0.0.1'] });
