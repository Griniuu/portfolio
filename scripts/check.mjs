import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import vm from 'node:vm';

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
for (const filename of ['dist/app.js', 'dist/config.js', 'dist/i18n.js', 'dist/gallery.js', 'scripts/serve.mjs', 'scripts/prepare-project-media.mjs', 'scripts/reviewed-project-code.mjs']) {
  const result = spawnSync(process.execPath, ['--check', fileURLToPath(new URL(`../${filename}`, import.meta.url))], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}
const css = await readFile(new URL('styles.css', dist), 'utf8');
assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length, 'Unbalanced CSS blocks');
assert.ok(css.includes('prefers-reduced-motion'), 'Missing reduced motion styles');
assert.ok(html.includes('lang="pl"'), 'Missing Polish language declaration');
assert.ok(!/href=""/.test(html), 'Empty navigation link');
assert.equal([...html.matchAll(/class="project-card /g)].length, 3, 'Expected three project cards');
const context = { window: {} };
vm.runInNewContext(await readFile(new URL('config.js', dist), 'utf8'), context);
let mediaCount = 0;
for (const [project, items] of Object.entries(context.window.PORTFOLIO_CONFIG.galleries || {})) {
  assert.ok(Array.isArray(items), `Invalid gallery for ${project}`);
  for (const item of items) {
    assert.ok(['code', 'screenshot'].includes(item.kind), `Gallery must use code or real interface screenshots: ${project}`);
    assert.ok(typeof item.src === 'string' && item.src, `Missing gallery image for ${project}`);
    assert.ok(item.alt && item.caption, `Missing gallery description for ${project}`);
    if (!/^https?:/.test(item.src)) await access(new URL(item.src, dist));
    mediaCount++;
  }
}
const languageChecks = spawnSync(process.execPath, [fileURLToPath(new URL('./check-i18n.mjs', import.meta.url))], { encoding: 'utf8' });
assert.equal(languageChecks.status, 0, languageChecks.stderr);
process.stdout.write(languageChecks.stdout);
const galleryChecks = spawnSync(process.execPath, [fileURLToPath(new URL('./check-gallery.mjs', import.meta.url))], { encoding: 'utf8' });
assert.equal(galleryChecks.status, 0, galleryChecks.stderr);
process.stdout.write(galleryChecks.stdout);
const privacyChecks = spawnSync(process.execPath, [fileURLToPath(new URL('./check-code-privacy.mjs', import.meta.url))], { encoding: 'utf8' });
assert.equal(privacyChecks.status, 0, privacyChecks.stderr);
process.stdout.write(privacyChecks.stdout);
console.log(`OK: ${ids.length} unique IDs, navigation targets, local assets, JavaScript syntax, CSS blocks, accessibility fallbacks, three projects.`);
console.log(`OK: ${mediaCount} configured gallery assets and their descriptions.`);
