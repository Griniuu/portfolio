import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extractReviewedSnippet, reviewedCode } from './reviewed-project-code.mjs';

const decode = (text) => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
for (const selection of reviewedCode) {
  const svg = await readFile(new URL(`../dist/assets/projects/${selection.destination}`, import.meta.url), 'utf8');
  const description = svg.match(/<desc id="desc">([\s\S]*?)<\/desc>/)?.[1];
  assert.ok(description, `Missing code description: ${selection.destination}`);
  const code = decode(description).replace(/^Source excerpt, lines \d+–\d+\. /, '');
  assert.equal(createHash('sha256').update(code).digest('hex'), selection.sha256,
    `Export differs from the reviewed code: ${selection.destination}`);
  const expected = extractReviewedSnippet(code, selection);
  const visibleLines = [...svg.matchAll(/<text x="104"[^>]*>([\s\S]*?)<\/text>/g)]
    .map((match) => decode(match[1])).join('\n');
  assert.equal(visibleLines, code, 'Visible code and accessible description must match');
  assert.ok(!/(?:\b[A-Z]:[\\/]|file:\/\/|-----BEGIN [^-]*PRIVATE KEY|<script\b|<image\b|onload\s*=|onerror\s*=)/i.test(svg),
    'Code image must contain text and shapes without local paths, keys, scripts or embedded files');
  assert.ok(!/(?:\bpassword\b|\bpasswd\b|\bsecret\b|api[_-]?key|\btoken\b|DATABASE_URL|SMTP_|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i.test(code),
    'Unexpected private-data indicator in exported code');
  const changed = code.replace('\n', selection.language === 'python'
    ? '\n    private_value = "test-only"\n' : '\n  const private_value = "test-only";\n');
  assert.throws(() => extractReviewedSnippet(changed, selection), /Privacy review required/,
    'Changes inside a reviewed excerpt must stop export');
  if (selection.language === 'python') {
    const withAdjacentCode = `${code}\n\nPRIVATE_SETTING = "not-for-export"\n`;
    assert.equal(extractReviewedSnippet(withAdjacentCode, selection).code, expected.code,
      'Adjacent settings must not be copied into a Python code image');
  } else {
    const withAdjacentCode = `${code}\nconst PRIVATE_SETTING = "not-for-export";\n`;
    assert.equal(extractReviewedSnippet(withAdjacentCode, selection).code, expected.code,
      'Adjacent settings must not be copied into a JavaScript code image');
  }
}
console.log(`OK: all ${reviewedCode.length} code images match reviewed snippets; no local paths or private-data indicators; changed excerpts require another review.`);
