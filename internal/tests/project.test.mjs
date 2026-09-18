import test from 'node:test';
import assert from 'node:assert/strict';
import { translations } from '../src/translations.js';
import { createAppServer } from '../server.mjs';

test('Both languages cover the same UI and state messages', () => {
  assert.deepEqual(Object.keys(translations.pl).sort(), Object.keys(translations.en).sort());
  assert.equal(translations.pl.network, 'SIEĆ WEWNĘTRZNA');
  assert.equal(translations.en.network, 'INTRANET');
  for (const messages of Object.values(translations)) for (const value of Object.values(messages)) assert.ok(value.trim());
});
test('Node serves the built page and assets, without accepting credentials', async () => {
  const server = createAppServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const page = await fetch(base);
    assert.equal(page.status, 200);
    assert.match(await page.text(), /<div id="root"><\/div>/);
    const sprite = await fetch(base + '/assets/logo-pixel.png');
    assert.equal(sprite.status, 200); assert.equal(sprite.headers.get('content-type'), 'image/png');
    assert.equal((await fetch(base + '/', { method: 'POST', body: 'test' })).status, 405);
    assert.equal((await fetch(base + '/package.json')).status, 404);
    assert.equal((await fetch(base + '/..%2fpackage.json')).status, 403);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
});
