import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const source = await readFile(new URL('../dist/i18n.js', import.meta.url), 'utf8');
const application = await readFile(new URL('../dist/app.js', import.meta.url), 'utf8');
const gallery = await readFile(new URL('../dist/gallery.js', import.meta.url), 'utf8');
const decode = (text) => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// A small DOM adapter exercises the language module with the actual page copy.
// It does not replace visual browser QA or simulate layout.
function createElement(attributes = {}) {
  return {
    attributes: { ...attributes },
    dataset: {},
    listeners: {},
    getAttribute(name) { return this.attributes[name] ?? null; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    addEventListener(type, callback) { this.listeners[type] = callback; }
  };
}

function boot({ query = '', saved = null, blockedStorage = false } = {}) {
  const body = html.split('<body>')[1].split('</body>')[0]
    .replace(/<svg\b[\s\S]*?<\/svg>/g, '')
    .replace(/<div class="toast"[\s\S]*?<\/div>/g, '')
    .replace(/<span class="project-counter[^>]*>[\s\S]*?<\/span>/g, '');
  const nodes = body.split(/<[^>]*>/).map((value) => ({
    original: decode(value),
    nodeValue: decode(value),
    isConnected: true,
    parentElement: { closest() { return null; } }
  }));
  const attributes = [...html.matchAll(/(?:aria-label|title)="[^"]+"/g)].map((match) => {
    const [, name, value] = match[0].match(/^([^=]+)="([^"]+)"$/);
    return createElement({ [name]: decode(value) });
  });
  const metadata = [...html.matchAll(/<meta (?:name="description"|property="og:description") content="([^"]+)"/g)]
    .map((match) => ({ content: match[1] }));
  const buttons = ['pl', 'en'].map((language) => {
    const button = createElement();
    button.dataset.language = language;
    return button;
  });
  const languageStatus = { textContent: '' };
  const root = { lang: 'pl', dataset: {} };
  const changes = [];
  const document = {
    body: {},
    documentElement: root,
    createTreeWalker() {
      let index = -1;
      return {
        nextNode() { index++; return index < nodes.length; },
        get currentNode() { return nodes[index]; }
      };
    },
    querySelectorAll(selector) {
      if (selector === '[aria-label], [title]') return attributes;
      if (selector === 'meta[name="description"], meta[property="og:description"]') return metadata;
      if (selector === 'button[data-language]') return buttons;
      throw new Error(`Unexpected selector: ${selector}`);
    },
    querySelector(selector) {
      assert.equal(selector, '.language-status');
      return languageStatus;
    },
    dispatchEvent(event) { changes.push(event.detail.language); }
  };
  const storage = new Map(saved ? [['griniuu-language', saved]] : []);
  const window = {
    location: new URL(`https://example.com/${query}#projekty`),
    history: {
      state: { preserved: true },
      replaceState(state, title, url) { this.state = state; window.location = new URL(url); }
    }
  };
  vm.runInNewContext(source, {
    document,
    window,
    NodeFilter: { SHOW_TEXT: 4 },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    URL,
    URLSearchParams,
    localStorage: {
      getItem(key) { if (blockedStorage) throw new Error('Unavailable'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blockedStorage) throw new Error('Unavailable'); storage.set(key, value); }
    }
  });
  return { i18n: window.PORTFOLIO_I18N, root, nodes, attributes, metadata, buttons, storage, window, changes, languageStatus };
}

const page = boot({ query: '?source=portfolio' });
assert.equal(page.root.lang, 'pl');
page.buttons[1].listeners.click();
assert.equal(page.root.lang, 'en');
assert.equal(page.buttons[1].getAttribute('aria-pressed'), 'true');
assert.equal(page.buttons[0].getAttribute('aria-pressed'), 'false');
assert.equal(page.nodes.find((node) => node.original.trim() === 'Projekty').nodeValue.trim(), 'Projects');
assert.ok(page.attributes.some((element) => element.getAttribute('aria-label') === 'Main navigation'));
assert.ok(page.metadata[0].content.includes('IT enthusiast'));
assert.equal(page.i18n.t('Skopiowano nick: {nickname}', { nickname: 'Griniuu' }), 'Nickname copied: Griniuu');
assert.equal(page.i18n.t('PROJEKT'), 'PROJECT');
assert.equal(page.i18n.t('PROJEKTY'), 'PROJECTS');
assert.equal(page.i18n.t('Panel Gracza'), 'Panel Gracza');
assert.equal(page.storage.get('griniuu-language'), 'en');
assert.equal(page.window.location.searchParams.get('lang'), 'en');
assert.equal(page.window.location.searchParams.get('source'), 'portfolio');
assert.equal(page.window.location.hash, '#projekty');
assert.equal(page.languageStatus.textContent, 'Language set to English.');

for (const match of application.matchAll(/description: '([^']+)'/g)) {
  assert.notEqual(page.i18n.t(match[1]), match[1], 'Missing project description translation');
}
for (const match of gallery.matchAll(/\bt\('([^']+)'/g)) {
  assert.notEqual(page.i18n.t(match[1]), match[1], `Missing gallery translation: ${match[1]}`);
}
for (const label of ['Grafika projektu', 'Zrzut ekranu', 'Zdjęcie', 'Kod źródłowy']) {
  assert.notEqual(page.i18n.t(label), label, `Missing gallery type translation: ${label}`);
}
const brandNames = new Set(['Twój', 'Różaniec.', 'Twój Różaniec']);
for (const node of page.nodes) {
  const original = node.original.trim();
  if (/[ąćęłńóśźż]/i.test(original) && !brandNames.has(original)) {
    assert.notEqual(node.nodeValue.trim(), original, `Untranslated page copy: ${original}`);
  }
}

page.buttons[0].listeners.click();
assert.equal(page.root.lang, 'pl');
assert.equal(page.window.location.searchParams.get('lang'), null);
assert.equal(page.window.location.searchParams.get('source'), 'portfolio');
for (const node of page.nodes) assert.equal(node.nodeValue, node.original, 'Polish copy did not restore exactly');
page.i18n.setLanguage('de');
assert.equal(page.root.lang, 'pl', 'Unsupported language should not change the page');
assert.equal(boot({ saved: 'en' }).root.lang, 'en');
assert.equal(boot({ query: '?lang=pl', saved: 'en' }).root.lang, 'pl');
assert.equal(boot({ query: '?lang=en' }).root.lang, 'en');
const privatePage = boot({ blockedStorage: true });
privatePage.i18n.setLanguage('en');
assert.equal(privatePage.root.lang, 'en');
console.log('OK: PL/EN copy, project descriptions, labels, metadata, language buttons, persistence, URL precedence and unavailable storage.');
