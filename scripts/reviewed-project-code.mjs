import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Only these manually reviewed, generic functions may be exported.
// A source change requires reviewing the excerpt again before updating its hash.
export const reviewedCode = [
  {
    project: 'panelgracza', title: 'Panel Gracza', filename: 'app/calculator_algorithms.py',
    functionName: 'maximize_souls', language: 'python', destination: 'panelgracza/kalkulator-kod.svg',
    sha256: '7dbeb101e1ec3477e6823c3bdadf218f527b6ac68c40de638df13e7f618879c5'
  },
  {
    project: 'panelgracza', title: 'Panel Gracza', filename: 'static/js/drify-rules.js',
    functionName: 'getEpicSlotRules', language: 'javascript', destination: 'panelgracza/ekwipunek-kod.svg',
    sha256: '92492704ff2d7bd1a6dfee15bea8be5b7855af29c397081b1b83bdfe47e4d804'
  },
  {
    project: 'panelgracza', title: 'Panel Gracza', filename: 'app/calculator_algorithms.py',
    functionName: 'optimal_purchase_plan', language: 'python', destination: 'panelgracza/plan-zakupow-kod.svg',
    sha256: '36d8d329644e10efd0f6b1422fd041d78d060122301c872f0f8debed02a42073'
  },
  {
    project: 'panelgracza', title: 'Panel Gracza', filename: 'app/calculator_algorithms.py',
    functionName: 'purchase_steps', language: 'python', destination: 'panelgracza/kroki-zakupow-kod.svg',
    sha256: '0f1e771adbf488f72e7ce92a90f198d70b4c2227c49b31cdeb2df7fef7730d3f'
  },
  {
    project: 'panelgracza', title: 'Panel Gracza', filename: 'static/js/drify-rules.js',
    functionName: 'getEffectiveItemCapacity', language: 'javascript', destination: 'panelgracza/pojemnosc-przedmiotu-kod.svg',
    sha256: '82563e34a37cf2cc13182bc05deb24629dfbfbff7721b4020dfc609cfa4e308e'
  },
  {
    project: 'panelgracza', title: 'Panel Gracza', filename: 'static/js/drify-rules.js',
    functionName: 'getAllowedOrbTypesForSlot', language: 'javascript', destination: 'panelgracza/dopasowanie-orbow-kod.svg',
    sha256: 'bbdf71f0c182be8e58f4baac7d9606480c92c74aab658997c002cb0538d742e9'
  },
  {
    project: 'lootstrefa', title: 'Loot Strefa TCG', filename: 'public/js/cart.js',
    functionName: 'getCart', language: 'javascript', destination: 'lootstrefa/koszyk-kod.svg',
    sha256: '4a029aa157acbc0cd0fbd45e0d4bc2aebf79268213b20a3f3d05f349e8a3abb1'
  },
  {
    project: 'lootstrefa', title: 'Loot Strefa TCG', filename: 'server/product_content.py',
    functionName: 'default_specification', language: 'python', destination: 'lootstrefa/produkty-kod.svg',
    sha256: '8d10378a56f5985a8b019a08311e67980d93c88ee78cf04425b0d3da04ca70b9'
  },
  {
    project: 'lootstrefa', title: 'Loot Strefa TCG', filename: 'public/js/cart.js',
    functionName: 'selectCrossSellProducts', language: 'javascript', destination: 'lootstrefa/rekomendacje-kod.svg',
    sha256: 'cb344b52bea1ec143dfe175ab4d0ccaed46b1b443b281b6d410a7123b980637d'
  },
  {
    project: 'lootstrefa', title: 'Loot Strefa TCG', filename: 'public/js/cart.js',
    functionName: 'scoreCrossSellProduct', language: 'javascript', destination: 'lootstrefa/ocena-produktow-kod.svg',
    sha256: '967334b65873ec537cc57ec602de0c257222e233c4c6f8bb2dca271d448d8e6a'
  },
  {
    project: 'lootstrefa', title: 'Loot Strefa TCG', filename: 'public/js/cart.js',
    functionName: 'isValidPolishNip', language: 'javascript', destination: 'lootstrefa/walidacja-nip-kod.svg',
    sha256: 'd701f0cfa740f5e64ae9f57823821923caa68e22038ab9f7008956f22dd5e9d4'
  },
  {
    project: 'lootstrefa', title: 'Loot Strefa TCG', filename: 'server/product_content.py',
    functionName: 'description_text', language: 'python', destination: 'lootstrefa/opisy-produktow-kod.svg',
    sha256: 'e0f2aa2f617b3ddf7cfd791a58271229913619267d50d43cde385be4fca303b1'
  }
];

export function extractReviewedSnippet(source, selection) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const prefix = selection.language === 'python' ? 'def' : 'function';
  const start = lines.findIndex((line) => line.startsWith(`${prefix} ${selection.functionName}(`));
  assert.ok(start >= 0, `Missing reviewed function: ${selection.functionName}`);
  let end = start + 1;
  if (selection.language === 'python') {
    while (end < lines.length && (!lines[end].trim() || /^\s/.test(lines[end]))) end++;
  } else {
    while (end < lines.length && !/^\}/.test(lines[end])) end++;
    assert.ok(end < lines.length, `Unclosed reviewed function: ${selection.functionName}`);
    end++;
  }
  const code = lines.slice(start, end).join('\n').trimEnd();
  const sha256 = createHash('sha256').update(code).digest('hex');
  assert.equal(sha256, selection.sha256,
    `Privacy review required: ${selection.filename} / ${selection.functionName} has changed. Export stopped.`);
  return { code, firstLine: start + 1, lines: code.split('\n') };
}
