import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractReviewedSnippet, reviewedCode } from './reviewed-project-code.mjs';

const [panelRoot, lootRoot] = process.argv.slice(2);
if (!panelRoot || !lootRoot) {
  throw new Error('Usage: node scripts/prepare-project-media.mjs <Panel Gracza source directory> <Loot Strefa source directory>');
}
const output = fileURLToPath(new URL('../dist/assets/projects/', import.meta.url));
const xml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
}[character]));

async function codeImage({ title: project, filename, destination, lines, firstLine }) {
  const width = Math.max(1320, Math.ceil(Math.max(...lines.map((line) => line.length)) * 12.1 + 150));
  const height = 130 + lines.length * 30;
  const rows = lines.map((line, index) => `<text x="39" y="${116 + index * 30}" fill="#68796f">${firstLine + index}</text><text x="104" y="${116 + index * 30}" fill="#dce7dd" xml:space="preserve">${xml(line)}</text>`).join('\n');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">${xml(project)} — ${xml(filename)}</title>
<desc id="desc">Source excerpt, lines ${firstLine}–${firstLine + lines.length - 1}. ${xml(lines.join('\n'))}</desc>
<rect width="${width}" height="${height}" rx="18" fill="#0c1210"/>
<path d="M18 0H${width - 18}Q${width} 0 ${width} 18V68H0V18Q0 0 18 0" fill="#19241e"/>
<circle cx="30" cy="34" r="6" fill="#ff7c78"/><circle cx="52" cy="34" r="6" fill="#edc76c"/><circle cx="74" cy="34" r="6" fill="#8ccf85"/>
<g font-family="Consolas, 'Courier New', monospace" font-size="20">
<text x="108" y="41" fill="#c2f576">${xml(project)} / ${xml(filename)}</text>
${rows}
</g></svg>\n`;
  await writeFile(path.join(output, destination), svg);
  console.log(`${destination}: ${filename}:${firstLine}-${firstLine + lines.length - 1}`);
}

const roots = { panelgracza: panelRoot, lootstrefa: lootRoot };
// Review every excerpt before writing gallery assets.
const excerpts = await Promise.all(reviewedCode.map(async (selection) => {
  const source = await readFile(path.join(roots[selection.project], selection.filename), 'utf8');
  return { ...selection, ...extractReviewedSnippet(source, selection) };
}));
for (const project of ['panelgracza', 'lootstrefa']) await mkdir(path.join(output, project), { recursive: true });
for (const excerpt of excerpts) await codeImage(excerpt);
