import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const dist = new URL('../dist/', import.meta.url);
const version = async (filename) => createHash('sha256')
  .update(await readFile(new URL(filename, dist))).digest('hex').slice(0, 12);

// Version image URLs first, so their new versions also change config.js's hash.
const configFile = new URL('config.js', dist);
const originalConfig = await readFile(configFile, 'utf8');
let config = originalConfig;
const mediaPattern = /\bsrc:\s*(['"])(assets\/projects\/[^'"?]+)(?:\?v=[a-f0-9]+)?\1/g;
for (const match of originalConfig.matchAll(mediaPattern)) {
  const replacement = `src: ${match[1]}${match[2]}?v=${await version(match[2])}${match[1]}`;
  config = config.replace(match[0], replacement);
}
if (config !== originalConfig) await writeFile(configFile, config);

const indexFile = new URL('index.html', dist);
const originalHtml = await readFile(indexFile, 'utf8');
let html = originalHtml;
for (const filename of ['favicon.svg', 'styles.css', 'config.js', 'i18n.js', 'gallery.js', 'app.js']) {
  const escaped = filename.replaceAll('.', '\\.');
  html = html.replace(new RegExp(`((?:src|href)=")${escaped}(?:\\?v=[a-f0-9]+)?(")`, 'g'),
    `$1${filename}?v=${await version(filename)}$2`);
}
if (html !== originalHtml) await writeFile(indexFile, html);
console.log(`Asset versions: ${config !== originalConfig || html !== originalHtml ? 'updated' : 'already current'}.`);
