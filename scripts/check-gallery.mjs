import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../dist/gallery.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
let focused = null;

// Exercise the real gallery controller against controls parsed from index.html.
// This verifies interactions and state, not browser layout or image decoding.
function element(tag, attributes = {}) {
  return {
    tag, attributes: { ...attributes }, children: [], listeners: {}, hidden: false, disabled: false, open: false,
    getAttribute(name) { return this.attributes[name] ?? null; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    removeAttribute(name) { delete this.attributes[name]; },
    set src(value) { this.setAttribute('src', value); },
    get src() { return this.getAttribute('src'); },
    set href(value) { this.setAttribute('href', value); },
    get href() { return this.getAttribute('href'); },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); },
    dispatch(type, options = {}) {
      const event = { target: this, currentTarget: this, preventDefault() { this.prevented = true; }, ...options };
      for (const callback of this.listeners[type] || []) callback(event);
      return event;
    },
    click() { if (!this.disabled) this.dispatch('click'); },
    focus() { focused = this; },
    scrollIntoView() {},
    showModal() { this.open = true; },
    close() { this.open = false; this.dispatch('close'); },
    getBoundingClientRect() { return { left: 10, right: 100, top: 10, bottom: 100 }; }
  };
}

const controls = [...html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/g)].map((match) => {
  const attributes = Object.fromEntries([...match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map((attribute) => [attribute[1], attribute[2] ?? '']));
  return element(match[1], attributes);
});
const byId = (id) => {
  const control = controls.find((item) => item.getAttribute('id') === id);
  assert.ok(control, `Missing gallery control: ${id}`);
  return control;
};
const document = {
  querySelector(selector) { assert.ok(selector.startsWith('#')); return byId(selector.slice(1)); },
  querySelectorAll(selector) {
    assert.ok(/^\[.+\]$/.test(selector));
    const name = selector.slice(1, -1);
    return controls.filter((item) => Object.hasOwn(item.attributes, name));
  },
  createElement(tag) { return element(tag); }
};
const english = {
  'Materiał {current} z {total}': 'Item {current} of {total}',
  'Kod źródłowy': 'Source code',
  'Powiększ: {title}': 'Enlarge: {title}',
  'Pokaż: {title}': 'Show: {title}'
};
const i18n = {
  language: 'pl',
  t(text, values = {}) {
    return (this.language === 'en' ? english[text] || text : text)
      .replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
  }
};
const window = { location: new URL('https://portfolio.example/subfolder/'), PORTFOLIO_I18N: i18n };
vm.runInNewContext(source, { window, document, URL });
const gallery = window.PORTFOLIO_GALLERY.create();
const pictures = [
  { src: 'assets/screen.webp', caption: { pl: 'Strona główna', en: 'Homepage' } },
  { src: 'assets/source.svg', kind: 'code', caption: { pl: 'Logika koszyka', en: 'Cart logic' }, alt: { pl: 'Kod koszyka', en: 'Cart source' } },
  { src: 'https://cdn.example/photo.jpg', caption: '<b>Literal caption</b>' },
  { src: 'javascript:alert(1)' }, { src: 'data:image/svg+xml,bad' }, { src: '' }, null
];

assert.equal(gallery.setProject('empty', null, 'Empty'), 0);
assert.equal(byId('project-gallery').hidden, true);
assert.equal(gallery.setProject('panelgracza', pictures, 'Panel Gracza'), 3);
assert.equal(byId('project-gallery').hidden, false);
assert.equal(byId('gallery-image').src, 'https://portfolio.example/subfolder/assets/screen.webp');
assert.equal(byId('gallery-thumbnails').children.length, 3);
assert.equal(byId('gallery-thumbnails').children[0].getAttribute('aria-pressed'), 'true');
const previous = document.querySelectorAll('[data-gallery-previous]');
const next = document.querySelectorAll('[data-gallery-next]');
next[0].click();
assert.equal(byId('gallery-image').alt, 'Kod koszyka');
assert.equal(byId('gallery-kind').textContent, 'Kod źródłowy');
assert.equal(byId('gallery-thumbnails').children[1].getAttribute('aria-pressed'), 'true');
const thumbnail = byId('gallery-thumbnails').children[1];
byId('project-dialog').open = true;
byId('gallery-open').click();
assert.equal(byId('gallery-viewer').open, true);
assert.equal(byId('gallery-viewer-image').src, byId('gallery-image').src);
assert.equal(focused, byId('gallery-viewer-close'));
i18n.language = 'en';
gallery.setProject('panelgracza', pictures, 'Panel Gracza');
assert.equal(byId('gallery-caption').textContent, 'Cart logic');
assert.equal(byId('gallery-viewer-title').textContent, 'Cart logic');
assert.equal(byId('gallery-position').textContent, 'Item 2 of 3');
assert.equal(byId('gallery-kind').textContent, 'Source code');
assert.equal(byId('gallery-viewer').open, true);
assert.equal(byId('gallery-thumbnails').children[1], thumbnail, 'Language changes must retain focused thumbnails');
const keyboard = byId('gallery-viewer').dispatch('keydown', { key: 'ArrowRight' });
assert.equal(keyboard.prevented, true);
assert.equal(byId('gallery-caption').textContent, '<b>Literal caption</b>');
assert.equal(byId('gallery-caption').children.length, 0, 'Captions must be plain text');
next[1].click();
assert.equal(byId('gallery-image').src, 'https://portfolio.example/subfolder/assets/screen.webp', 'Gallery wraps forward');
previous[1].click();
assert.equal(byId('gallery-original').href, 'https://cdn.example/photo.jpg', 'Gallery wraps backward');
byId('gallery-viewer-close').click();
assert.equal(byId('gallery-viewer').open, false);
assert.equal(focused, byId('gallery-open'));
byId('gallery-thumbnails').children[0].click();
assert.equal(byId('gallery-position').textContent, 'Item 1 of 3');
byId('gallery-image').dispatch('error');
assert.equal(byId('gallery-error').hidden, false);
assert.equal(byId('gallery-image').hidden, true);
assert.equal(byId('gallery-open').disabled, true);
next[0].click();
assert.equal(byId('gallery-error').hidden, true);
assert.equal(byId('gallery-open').disabled, false);
byId('gallery-open').click();
byId('gallery-viewer').dispatch('click', { clientX: 0, clientY: 0 });
assert.equal(byId('gallery-viewer').open, false, 'Backdrop click closes enlarged view');
byId('gallery-open').click();
assert.equal(gallery.setProject('lootstrefa', [pictures[0]], 'Loot Strefa'), 1);
assert.equal(byId('gallery-viewer').open, false, 'Changing projects closes the previous enlarged view');
assert.equal(byId('gallery-position').textContent, 'Item 1 of 1');
assert.ok(previous.every((button) => button.disabled) && next.every((button) => button.disabled));
byId('gallery-open').click();
gallery.clear();
assert.equal(byId('gallery-viewer').open, false);
assert.equal(byId('project-gallery').hidden, true);
assert.equal(byId('gallery-image').getAttribute('src'), null);
assert.equal(byId('gallery-original').getAttribute('href'), null);
assert.equal(byId('gallery-thumbnails').children.length, 0);
console.log('OK: gallery thumbnails, navigation, keyboard, enlarged view, PL/EN state, missing images, safe URLs, plain text captions and empty galleries.');
