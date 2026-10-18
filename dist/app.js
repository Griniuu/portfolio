(() => {
  'use strict';

  const config = window.PORTFOLIO_CONFIG || {};
  const nickname = config.nickname || 'Griniuu';
  const root = document.documentElement;
  const t = (text, values) => window.PORTFOLIO_I18N.t(text, values);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  // The theme is kept between visits; storage is optional.
  const themeToggle = document.querySelector('.theme-toggle');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeToggle.innerHTML = icon(isDark ? 'sun' : 'moon');
    themeToggle.setAttribute('aria-label', t(isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'));
    themeToggle.title = t('Zmień motyw');
    document.querySelector('meta[name="theme-color"]').content = isDark ? '#0b0e0d' : '#f4f5ee';
  }
  try {
    const saved = localStorage.getItem('griniuu-theme');
    if (saved === 'light' || saved === 'dark') applyTheme(saved);
  } catch { /* Private browsing may restrict storage. */ }
  themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('griniuu-theme', next); } catch { /* Optional. */ }
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', t('Otwórz menu'));
    menuToggle.innerHTML = icon('menu');
  }
  menuToggle.addEventListener('click', () => {
    const open = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', t(open ? 'Zamknij menu' : 'Otwórz menu'));
    menuToggle.innerHTML = icon(open ? 'close' : 'menu');
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav') && navLinks.classList.contains('open')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

  if ('IntersectionObserver' in window) {
    if (!reducedMotion) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px 25px 0px' });
      document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
      root.classList.add('motion-ready');
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.querySelectorAll('a').forEach((link) => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
  }

  const progress = document.querySelector('.scroll-progress');
  let scrollQueued = false;
  function updateProgress() {
    const distance = root.scrollHeight - window.innerHeight;
    progress.style.width = `${distance > 0 ? (window.scrollY / distance) * 100 : 0}%`;
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const projectCards = [...document.querySelectorAll('.project-card')];
  const filters = [...document.querySelectorAll('.filter-button')];
  function updateProjectCounter() {
    const count = projectCards.filter((card) => !card.hidden).length;
    const label = count === 1 ? 'PROJEKT' : count >= 2 && count <= 4 ? 'PROJEKTY' : 'PROJEKTÓW';
    document.querySelector('.project-counter').textContent = `${count} ${t(label)}`;
  }
  filters.forEach((button) => button.addEventListener('click', () => {
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach((card) => {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
      if (visible) {
        card.classList.add('is-visible');
      }
    });
    updateProjectCounter();
    updateProgress();
  }));

  const projects = {
    panelgracza: {
      title: 'Panel Gracza', number: '01', category: 'GAMING / WEB DEVELOPMENT', type: 'Strona internetowa',
      description: 'Panel Gracza to jeden z moich projektów internetowych. Gaming jest mi bliski, więc ten projekt w naturalny sposób łączy moje zainteresowania z tworzeniem stron. To część portfolio, w którym rozwijam swoje umiejętności webowe.',
      url: config.projects?.panelgracza ?? 'https://panelgracza.pl'
    },
    lootstrefa: {
      title: 'Loot Strefa TCG', number: '02', category: 'TCG / WEB DEVELOPMENT', type: 'Strona internetowa',
      description: 'Loot Strefa TCG to mój projekt internetowy związany ze światem kart kolekcjonerskich. Obok Panelu Gracza i Twojego Różańca tworzy zestaw realizacji, w których pracuję z różnymi tematami i rozwijam swój warsztat programisty.',
      url: config.projects?.lootstrefa ?? 'https://lootstrefatcg.pl'
    },
    rozaniec: {
      title: 'Twój Różaniec', number: '03', category: 'PROJEKT OSOBISTY / WEB DEVELOPMENT', type: 'Projekt webowy',
      description: 'Twój Różaniec to kolejny projekt w moim portfolio. Pokazuje inną stronę mojej pracy — poza tematyką gamingu i kolekcjonerstwa. Różnorodność pomysłów daje mi przestrzeń do nauki i szukania nowych rozwiązań.',
      url: config.projects?.rozaniec || ''
    }
  };

  Object.entries(projects).forEach(([key, project]) => {
    const card = document.querySelector(`[data-project="${key}"]`);
    const url = safeUrl(project.url);
    const currentLink = card.querySelector('.project-footer a');
    if (currentLink && url) currentLink.href = url;
    if (currentLink && !url) currentLink.remove();
    if (key === 'rozaniec' && url) {
      const link = document.createElement('a');
      link.className = 'configured-project-link';
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = `${t('Odwiedź stronę')} ${icon('up-right')}<span class="sr-only"> ${t('— otwiera się w nowej karcie')}</span>`;
      card.querySelector('.project-footer .text-link').replaceWith(link);
    }
  });

  const dialog = document.querySelector('#project-dialog');
  const projectGallery = window.PORTFOLIO_GALLERY.create();
  let lastProjectTrigger = null;
  let activeProjectKey = null;
  let previousOverflow = '';
  function renderProject(key) {
    const project = projects[key];
    if (!project) return;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-number').textContent = project.number;
    document.querySelector('#dialog-category').textContent = t(project.category);
    document.querySelector('#dialog-description').textContent = t(project.description);
    document.querySelector('#dialog-type').textContent = t(project.type);
    const hasGallery = projectGallery.setProject(key, config.galleries?.[key], project.title) > 0;
    document.querySelector('#dialog-art').hidden = hasGallery;
    document.querySelector('.dialog-art-note').hidden = hasGallery;
    const art = document.querySelector(`[data-project="${key}"] .project-art`).cloneNode(true);
    art.removeAttribute('data-open-project');
    art.removeAttribute('aria-label');
    art.disabled = true;
    art.tabIndex = -1;
    // Give cloned SVG gradients unique IDs while retaining the shared icon symbols.
    art.querySelectorAll('[id]').forEach((element) => {
      const oldId = element.id;
      const newId = `detail-${oldId}`;
      element.id = newId;
      art.querySelectorAll('*').forEach((child) => {
        [...child.attributes].forEach((attribute) => {
          if (attribute.value.includes(`url(#${oldId})`)) {
            child.setAttribute(attribute.name, attribute.value.replaceAll(`url(#${oldId})`, `url(#${newId})`));
          }
        });
      });
    });
    document.querySelector('#dialog-art').replaceChildren(art);
    const link = document.querySelector('#dialog-link');
    const url = safeUrl(project.url);
    link.hidden = !url;
    if (url) link.href = url;
    else link.removeAttribute('href');
    document.querySelector('#dialog-link-note').hidden = Boolean(url);
  }
  function openProject(key, trigger) {
    if (!projects[key]) return;
    activeProjectKey = key;
    lastProjectTrigger = trigger;
    renderProject(key);
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    dialog.scrollTop = 0;
    document.querySelector('.dialog-close').focus({ preventScroll: true });
  }
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-project]');
    if (trigger) openProject(trigger.dataset.openProject, trigger);
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    projectGallery.clear();
    activeProjectKey = null;
    document.body.style.overflow = previousOverflow;
    lastProjectTrigger?.focus({ preventScroll: true });
  });

  const toast = document.querySelector('.toast');
  let toastTimeout;
  let toastMessage = '';
  function showToast(message, success = true) {
    toastMessage = message;
    toast.querySelector('span').textContent = t(message, { nickname });
    toast.querySelector('use').setAttribute('href', success ? '#i-check' : '#i-copy');
    toast.classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3500);
  }
  document.querySelector('.button-nick').textContent = nickname;
  document.querySelector('.copy-nick').addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(nickname);
      copied = true;
    } catch {
      const field = document.createElement('textarea');
      field.value = nickname;
      field.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      field.setAttribute('readonly', '');
      document.body.append(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch { /* Show a helpful fallback. */ }
      field.remove();
      document.querySelector('.copy-nick').focus({ preventScroll: true });
    }
    showToast(copied ? 'Skopiowano nick: {nickname}' : 'Mój nick: {nickname}. Możesz skopiować go z przycisku.', copied);
  });

  // The email also exists in the static HTML; config can override or hide it.
  function updateContact() {
    const emailButton = document.querySelector('[data-email-button]');
    const emailAddress = document.querySelector('[data-email-address]');
    const valid = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email);
    emailButton.hidden = !valid;
    emailAddress.closest('.contact-soon').hidden = !valid;
    if (!valid) return;

    const subject = t('Cześć, Griniuu! Porozmawiajmy o projekcie.');
    emailButton.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}`;
    emailButton.querySelector('span').textContent = t('Napisz do mnie');
    emailAddress.href = `mailto:${config.email}`;
    emailAddress.textContent = config.email;
  }
  // Static social links also work without JavaScript. Config overrides them.
  const socialLinks = [...document.querySelectorAll('[data-social]')];
  socialLinks.forEach((link) => {
    const platform = link.dataset.social;
    const configuredUrl = config.socials?.[platform]
      ?? (platform === 'github' ? config.github : undefined);
    if (configuredUrl === undefined) return;

    const url = safeUrl(configuredUrl);
    link.hidden = !url;
    if (!url) {
      link.removeAttribute('href');
      return;
    }

    link.href = url;
    const handle = link.querySelector('.social-handle');
    if (platform !== 'steam') {
      const username = new URL(url).pathname.split('/').filter(Boolean)[0];
      if (username) handle.textContent = `@${username}`;
    }
  });
  document.querySelector('.social-hub').hidden = !socialLinks.some((link) => !link.hidden);

  function refreshLocalizedUI() {
    applyTheme(root.dataset.theme);
    const menuOpen = navLinks.classList.contains('open');
    menuToggle.setAttribute('aria-label', t(menuOpen ? 'Zamknij menu' : 'Otwórz menu'));
    updateProjectCounter();
    updateContact();
    if (dialog.open && activeProjectKey) renderProject(activeProjectKey);
    if (toastMessage) toast.querySelector('span').textContent = t(toastMessage, { nickname });
    document.querySelectorAll('.configured-project-link').forEach((link) => {
      link.innerHTML = `${t('Odwiedź stronę')} ${icon('up-right')}<span class="sr-only"> ${t('— otwiera się w nowej karcie')}</span>`;
    });
    updateProgress();
  }
  document.addEventListener('portfolio:languagechange', refreshLocalizedUI);
  refreshLocalizedUI();
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
