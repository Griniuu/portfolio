import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML/SVG IDs');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(match[1]), `Missing navigation or SVG target: ${match[1]}`);
}
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|mailto:)/.test(match[1])) continue;
  await access(new URL(match[1], dist));
}
for (const filename of ['dist/app.js', 'dist/config.js', 'scripts/serve.mjs']) {
  const result = spawnSync(process.execPath, ['--check', fileURLToPath(new URL(`../${filename}`, import.meta.url))], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}
const css = await readFile(new URL('styles.css', dist), 'utf8');
assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length, 'Unbalanced CSS blocks');
assert.ok(css.includes('prefers-reduced-motion'), 'Missing reduced motion styles');
assert.ok(html.includes('lang="pl"'), 'Missing Polish language declaration');
assert.ok(!/href=""/.test(html), 'Empty navigation link');
assert.equal([...html.matchAll(/class="project-card /g)].length, 3, 'Expected three project cards');
console.log(`OK: ${ids.length} unique IDs, navigation targets, local assets, JavaScript syntax, CSS blocks, accessibility fallbacks, three projects.`);
