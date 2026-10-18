(() => {
  'use strict';

  function create() {
    const find = (selector) => document.querySelector(selector);
    const root = find('#project-gallery');
    const image = find('#gallery-image');
    const openButton = find('#gallery-open');
    const error = find('#gallery-error');
    const thumbnails = find('#gallery-thumbnails');
    const viewer = find('#gallery-viewer');
    const viewerImage = find('#gallery-viewer-image');
    const viewerError = find('#gallery-viewer-error');
    const original = find('#gallery-original');
    const previous = [...document.querySelectorAll('[data-gallery-previous]')];
    const next = [...document.querySelectorAll('[data-gallery-next]')];
    const t = (text, values) => window.PORTFOLIO_I18N.t(text, values);
    const kindLabels = {
      design: 'Grafika projektu', screenshot: 'Zrzut ekranu', photo: 'Zdjęcie', code: 'Kod źródłowy'
    };
    let activeKey = null;
    let projectTitle = '';
    let items = [];
    let selected = 0;
    let buttons = [];
    let failed = new Set();

    function localize(value) {
      if (typeof value === 'string') return value;
      if (!value || typeof value !== 'object') return '';
      return value[window.PORTFOLIO_I18N.language] || value.pl || value.en || '';
    }

    function mediaUrl(value) {
      if (typeof value !== 'string' || !value.trim()) return null;
      try {
        const url = new URL(value, window.location.href);
        return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
      } catch {
        return null;
      }
    }

    function label(item, index) {
      return localize(item.caption) || localize(item.alt)
        || `${projectTitle} — ${t('Materiał {number}', { number: index + 1 })}`;
    }

    function closeViewer() {
      if (viewer.open) viewer.close();
    }

    function buildThumbnails() {
      buttons = items.map((item, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'gallery-thumbnail';
        const preview = document.createElement('img');
        preview.alt = '';
        preview.loading = 'lazy';
        preview.decoding = 'async';
        preview.width = 104;
        preview.height = 70;
        preview.addEventListener('error', () => { preview.hidden = true; });
        preview.src = item.src;
        const number = document.createElement('span');
        number.textContent = String(index + 1).padStart(2, '0');
        button.append(preview, number);
        button.addEventListener('click', () => select(index));
        return button;
      });
      thumbnails.replaceChildren(...buttons);
    }

    function render() {
      root.hidden = items.length === 0;
      if (!items.length) {
        image.removeAttribute('src');
        viewerImage.removeAttribute('src');
        original.removeAttribute('href');
        return;
      }
      const item = items[selected];
      const caption = label(item, selected);
      const alt = localize(item.alt) || caption;
      const isBroken = failed.has(selected);
      const position = t('Materiał {current} z {total}', { current: selected + 1, total: items.length });
      const kind = t(kindLabels[item.kind] || kindLabels.photo);
      image.alt = alt;
      if (image.getAttribute('src') !== item.src) image.src = item.src;
      image.hidden = isBroken;
      error.hidden = !isBroken;
      openButton.disabled = isBroken;
      openButton.setAttribute('aria-label', t('Powiększ: {title}', { title: caption }));
      find('#gallery-caption').textContent = caption;
      find('#gallery-kind').textContent = kind;
      find('#gallery-position').textContent = position;
      previous.forEach((button) => { button.disabled = items.length < 2; });
      next.forEach((button) => { button.disabled = items.length < 2; });
      buttons.forEach((button, index) => {
        button.setAttribute('aria-pressed', String(index === selected));
        button.setAttribute('aria-label', t('Pokaż: {title}', { title: label(items[index], index) }));
      });
      find('#gallery-viewer-title').textContent = caption;
      find('#gallery-viewer-position').textContent = position;
      original.href = item.src;
      original.hidden = isBroken;
      viewerImage.alt = alt;
      viewerImage.hidden = isBroken;
      viewerError.hidden = !isBroken;
      // Avoid downloading a second full image until the enlarged view opens.
      if (viewer.open && viewerImage.getAttribute('src') !== item.src) viewerImage.src = item.src;
    }

    function select(index) {
      if (!items.length) return;
      selected = (index + items.length) % items.length;
      render();
      buttons[selected].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    function handleImageError(event) {
      if (!items[selected] || event.currentTarget.getAttribute('src') !== items[selected].src) return;
      failed.add(selected);
      render();
    }
    image.addEventListener('error', handleImageError);
    viewerImage.addEventListener('error', handleImageError);
    previous.forEach((button) => button.addEventListener('click', () => select(selected - 1)));
    next.forEach((button) => button.addEventListener('click', () => select(selected + 1)));
    for (const surface of [root, viewer]) {
      surface.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
        event.preventDefault();
        select(selected + (event.key === 'ArrowRight' ? 1 : -1));
      });
    }
    openButton.addEventListener('click', () => {
      if (!items.length || failed.has(selected)) return;
      viewer.showModal();
      render();
      find('#gallery-viewer-close').focus({ preventScroll: true });
    });
    find('#gallery-viewer-close').addEventListener('click', closeViewer);
    viewer.addEventListener('close', () => {
      if (find('#project-dialog').open) openButton.focus({ preventScroll: true });
    });
    viewer.addEventListener('click', (event) => {
      const rect = viewer.getBoundingClientRect();
      if (event.target === viewer && (event.clientX < rect.left || event.clientX > rect.right
        || event.clientY < rect.top || event.clientY > rect.bottom)) closeViewer();
    });

    return Object.freeze({
      setProject(key, gallery, title) {
        const normalized = (Array.isArray(gallery) ? gallery : []).flatMap((item) => {
          const src = item && typeof item === 'object' ? mediaUrl(item.src) : null;
          return src ? [{ ...item, src }] : [];
        });
        const changed = key !== activeKey || normalized.length !== items.length
          || normalized.some((item, index) => item.src !== items[index].src);
        items = normalized;
        projectTitle = title;
        if (changed) {
          closeViewer();
          viewerImage.removeAttribute('src');
          activeKey = key;
          selected = 0;
          failed = new Set();
          buildThumbnails();
        }
        render();
        return items.length;
      },
      clear() {
        closeViewer();
        activeKey = null;
        items = [];
        buttons = [];
        thumbnails.replaceChildren();
        render();
      }
    });
  }

  window.PORTFOLIO_GALLERY = Object.freeze({ create });
})();
