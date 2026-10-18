(() => {
  'use strict';

  // Polish HTML is the default. Translate text nodes without rebuilding controls.
  const english = Object.freeze({
    // Navigation and accessibility.
    'Przejdź do treści': 'Skip to content',
    'Projekty': 'Projects',
    'O mnie': 'About me',
    'Moja droga': 'My journey',
    'Kontakt': 'Contact',
    'Porozmawiajmy': "Let's talk",
    'Nawigacja główna': 'Main navigation',
    'Griniuu — strona główna': 'Griniuu — home',
    'Język strony': 'Website language',
    'Włącz jasny motyw': 'Switch to light mode',
    'Włącz ciemny motyw': 'Switch to dark mode',
    'Zmień motyw': 'Change theme',
    'Otwórz menu': 'Open menu',
    'Zamknij menu': 'Close menu',
    'Przewiń do projektów': 'Scroll to projects',
    'Moja wizytówka w formie kodu Python': 'My profile as Python code',
    'Profil: Kacper Janiszewski, Python, HTML, CSS, JavaScript, gry i nowe technologie': 'Profile: Kacper Janiszewski, Python, HTML, CSS, JavaScript, gaming and technology',
    'Filtruj projekty': 'Filter projects',
    'Poznaj projekt Panel Gracza': 'Explore Panel Gracza',
    'Poznaj projekt Loot Strefa TCG': 'Explore Loot Strefa TCG',
    'Poznaj projekt Twój Różaniec': 'Explore Twój Różaniec',
    'Moje profile społecznościowe': 'My social profiles',
    'Zamknij szczegóły projektu': 'Close project details',
    'Obszary zainteresowań': 'Areas of interest',

    // Hero.
    'Koduję pomysły.': 'I code ideas.',
    'Gram o więcej': 'I play for more',
    'Programista z pasji, gracz po godzinach. Interesuje mnie całe IT — od sprzętu i sieci po tworzenie oprogramowania. Kod piszę głównie w Pythonie i technologiach webowych.': 'A developer by passion, a gamer after hours. My curiosity spans all of IT — from hardware and networks to software development. I mainly code in Python and web technologies.',
    'Zobacz projekty': 'Explore my projects',
    'Poznaj mnie': 'Get to know me',
    'Technik informatyk': 'Qualified IT technician',
    'Student informatyki na ZUT': 'Computer Science student at ZUT',
    '# Cześć, jestem Griniuu 👋': "# Hi, I'm Griniuu 👋",
    '"kod"': '"code"',
    '"gry"': '"gaming"',
    'Pomysł. Kod. Działający projekt.': 'Idea. Code. A working project.',
    'PO GODZINACH': 'AFTER HOURS',
    'OD BACKENDU PO PIERWSZE WRAŻENIE': 'FROM BACKEND TO FIRST IMPRESSIONS',

    // Project cards and filters. Keep original project names as their brands.
    '/ WYBRANE REALIZACJE': '/ SELECTED PROJECTS',
    'Mniej gadania.': 'Less talking.',
    'Więcej tworzenia.': 'More building.',
    'Każdy projekt to nowy problem do rozwiązania.': 'Every project is a new problem to solve.',
    'I kolejny powód, żeby napisać trochę kodu.': 'And another reason to write some code.',
    'Wszystkie': 'All projects',
    'Pozostałe': 'Other projects',
    'PROJEKT': 'PROJECT',
    'PROJEKTY': 'PROJECTS',
    'PROJEKTÓW': 'PROJECTS',
    'WIZUALIZACJA': 'VISUAL CONCEPT',
    '01 / PROJEKT WEBOWY': '01 / WEB PROJECT',
    '02 / PROJEKT WEBOWY': '02 / WEB PROJECT',
    '03 / PROJEKT WEBOWY': '03 / WEB PROJECT',
    'Gaming spotyka web development. Jeden z projektów, w których łączę moje dwa światy.': 'Gaming meets web development. One of the projects where my two worlds come together.',
    'WEB / KOLEKCJONERSTWO': 'WEB / COLLECTIBLES',
    'Projekt ze świata kart kolekcjonerskich. Kolejna odsłona mojej pracy nad stronami internetowymi.': 'A project from the world of trading cards. Another chapter in my web development journey.',
    'CHWILA NA WYCISZENIE.': 'A MOMENT OF QUIET.',
    'WEB / OSOBISTE': 'WEB / PERSONAL',
    'INNA PERSPEKTYWA': 'A NEW PERSPECTIVE',
    'Inny temat, ta sama ciekawość tworzenia. Projekt, który poszerza moje webowe portfolio.': 'A different subject, the same curiosity. A project that adds a new perspective to my web portfolio.',
    'Projekt osobisty': 'Personal project',
    'Poznaj projekt': 'Explore the project',
    'To dopiero część mojej drogi. Najciekawsze rzeczy są jeszcze do zbudowania.': "This is only part of my journey. The most exciting things are still to come.",
    '— otwiera się w nowej karcie': '— opens in a new tab',

    // About and broader IT interests.
    '/ CZŁOWIEK ZA KODEM': '/ THE PERSON BEHIND THE CODE',
    'Cześć, jestem Kacper': "Hi, I'm Kacper",
    'W sieci — Griniuu.': 'Online — Griniuu.',
    'Najlepiej odnajduję się tam, gdzie pomysł spotyka klawiaturę.': 'I feel most at home where ideas meet the keyboard.',
    'Programuję przede wszystkim w Pythonie': 'I mainly program in Python',
    ', a z HTML, CSS i JavaScript buduję to, co widać i z czym można wejść w interakcję.': ', and I use HTML, CSS and JavaScript to build what people see and interact with.',
    'Informatyka to dla mnie więcej niż programowanie. Interesują mnie naprawa i diagnostyka sprzętu, sieci komputerowe, systemy oraz inne gałęzie IT. Lubię rozumieć, jak poszczególne elementy działają razem.': 'IT means more to me than programming. I am interested in hardware repair and diagnostics, computer networks, systems and other areas of computing. I enjoy understanding how all the pieces work together.',
    'Mam tytuł technika informatyka. Dziś rozwijam się na informatyce na': "I'm a qualified IT technician. I'm currently studying Computer Science at the",
    'Zachodniopomorskim Uniwersytecie Technologicznym w Szczecinie': 'West Pomeranian University of Technology in Szczecin',
    ', ze specjalizacją inżynieria oprogramowania.': ', specialising in Software Engineering.',
    'A kiedy zamykam edytor? Odpalam grę. Lubię odkrywać, jak działają rzeczy — zarówno po stronie kodu, jak i po drugiej stronie ekranu.': 'When I close the editor, I fire up a game. I enjoy discovering how things work — both in the code and on the other side of the screen.',
    'Sprzęt i naprawy': 'Hardware and repair',
    'Sieci i systemy': 'Networks and systems',
    'Programowanie': 'Programming',
    'Gaming w DNA': 'Gaming in my DNA',

    // Stack.
    '/ TECHNOLOGIE': '/ TECHNOLOGIES',
    'Mój ekwipunek': 'My toolkit',
    'Dobieram narzędzia do pomysłu.': 'The idea shapes the tools I choose.',
    'Te towarzyszą mi najczęściej.': 'These are the ones I use most.',
    'Główny język': 'Main language',
    'Tu zaczyna się większość moich pomysłów.': 'Where most of my ideas begin.',
    'Mój pierwszy wybór do pisania kodu.': 'My first choice for writing code.',
    'Struktura, od której wszystko się zaczyna.': 'The structure that starts it all.',
    'Styl, responsywność i ruch.': 'Style, responsiveness and motion.',
    'Interakcje, które ożywiają interfejs.': 'Interactions that bring interfaces to life.',
    'Narzędzie do zarządzania bazami MySQL i MariaDB.': 'A tool for managing MySQL and MariaDB databases.',
    'BAZY DANYCH': 'DATABASES',
    'Stack nigdy nie jest skończony.': 'A toolkit is never finished.',
    'Zawsze jest coś nowego do nauczenia.': 'There is always something new to learn.',

    // Education.
    '/ ROZWÓJ': '/ MY JOURNEY',
    'Kolejny level?': 'The next level?',
    'Jestem w drodze.': 'I am on my way.',
    'Solidne podstawy, własne projekty i nauka, która trwa dalej.': 'Solid foundations, personal projects and learning that never stops.',
    'TERAZ': 'NOW',
    'W trakcie': 'In progress',
    'Student informatyki': 'Computer Science student',
    'Zachodniopomorski Uniwersytet Technologiczny w Szczecinie': 'West Pomeranian University of Technology in Szczecin',
    'Specjalizacja:': 'Specialisation:',
    'inżynieria oprogramowania': 'Software Engineering',
    '. Kolejny etap rozwijania wiedzy i umiejętności tworzenia oprogramowania.': '. The next step in developing my software engineering knowledge and skills.',
    'FUNDAMENT': 'FOUNDATION',
    'Ukończone': 'Completed',
    'Wykształcenie techniczne · kwalifikacje zawodowe': 'Technical education · vocational qualification',
    'Potwierdzone kwalifikacje w IT i baza, na której buduję kolejne projekty.': 'A recognised IT qualification and the foundation for my next projects.',

    // Contact, social profiles and footer.
    '/ NASTĘPNY PROJEKT': '/ THE NEXT PROJECT',
    'Dobry kod zaczyna się': 'Great code starts',
    'od dobrego': 'with a great',
    'pomysłu.': 'idea.',
    'Projekt, technologia czy po prostu rozmowa o grach?': 'A project, technology or simply a chat about games?',
    'Mamy już wspólny temat.': 'We already have something in common.',
    'Napisz do mnie': 'Email me',
    'Skopiuj mój nick': 'Copy my nickname',
    'Cześć, Griniuu! Porozmawiajmy o projekcie.': "Hi, Griniuu! Let's talk about a project.",
    'KOD. GRY. CONNECT.': 'CODE. GAMES. CONNECT.',
    'Znajdziesz mnie też tutaj': 'Find me here, too',
    'Profil gracza': 'Gaming profile',
    'Pomysł. Kod. Kolejny level.': 'Idea. Code. Next level.',
    'Do góry': 'Back to top',
    'ZROBIONE Z PASJI': 'BUILT WITH PASSION',

    // Project dialog and runtime messages.
    'TWÓRCA': 'CREATOR',
    'TYP': 'TYPE',
    'Strona internetowa': 'Website',
    'Projekt webowy': 'Web project',
    'PROJEKT OSOBISTY / WEB DEVELOPMENT': 'PERSONAL PROJECT / WEB DEVELOPMENT',
    'Autorska wizualizacja przedstawia motyw projektu. Nie jest zrzutem ekranu strony.': 'This original illustration represents the theme of the project. It is not a screenshot of the website.',
    'Odwiedź stronę': 'Visit website',
    'Link do projektu pojawi się wkrótce.': 'The project link will be added soon.',
    'Bliżej projektu': 'Inside the project',
    'Grafika projektu': 'Project artwork',
    'Zrzut ekranu': 'Screenshot',
    'Zdjęcie': 'Photo',
    'Kod źródłowy': 'Source code',
    'Powiększ': 'Enlarge',
    'Powiększ: {title}': 'Enlarge: {title}',
    'Pokaż: {title}': 'Show: {title}',
    'Materiał {number}': 'Item {number}',
    'Materiał {current} z {total}': 'Item {current} of {total}',
    'Poprzedni materiał': 'Previous item',
    'Następny materiał': 'Next item',
    'Wybierz materiał': 'Choose an item',
    'Zamknij powiększenie': 'Close enlarged view',
    'Otwórz oryginał': 'Open original',
    'Nie udało się wczytać materiału. Wybierz kolejny.': 'This item could not be loaded. Choose another one.',
    'Panel Gracza to jeden z moich projektów internetowych. Gaming jest mi bliski, więc ten projekt w naturalny sposób łączy moje zainteresowania z tworzeniem stron. To część portfolio, w którym rozwijam swoje umiejętności webowe.': 'Panel Gracza is one of my web projects. Gaming is close to my heart, so this project naturally connects my interests with building websites. It is part of a portfolio through which I continue to develop my web skills.',
    'Loot Strefa TCG to mój projekt internetowy związany ze światem kart kolekcjonerskich. Obok Panelu Gracza i Twojego Różańca tworzy zestaw realizacji, w których pracuję z różnymi tematami i rozwijam swój warsztat programisty.': 'Loot Strefa TCG is my web project connected with the world of trading cards. Alongside Panel Gracza and Twój Różaniec, it is part of a collection of projects where I explore different subjects and develop my programming skills.',
    'Twój Różaniec to kolejny projekt w moim portfolio. Pokazuje inną stronę mojej pracy — poza tematyką gamingu i kolekcjonerstwa. Różnorodność pomysłów daje mi przestrzeń do nauki i szukania nowych rozwiązań.': 'Twój Różaniec is another project in my portfolio. It shows a different side of my work, beyond gaming and collectibles. Exploring different ideas gives me room to learn and find new solutions.',
    'Skopiowano nick: {nickname}': 'Nickname copied: {nickname}',
    'Mój nick: {nickname}. Możesz skopiować go z przycisku.': 'My nickname: {nickname}. You can copy it from the button.',
    'Ustawiono język polski.': 'Language set to English.',

    // Metadata.
    'Kacper Janiszewski, Griniuu — pasjonat informatyki, programista Python i gracz. Sprzęt, naprawy, sieci i tworzenie oprogramowania. Poznaj moje projekty i drogę w IT.': 'Kacper Janiszewski, Griniuu — IT enthusiast, Python developer and gamer. Hardware, repair, networks and software development. Explore my projects and journey in IT.',
    'Koduję pomysły. Gram o więcej. Python, web development i projekty, które żyją w sieci.': 'I code ideas. I play for more. Python, web development and projects that live on the web.'
  });

  let language = 'pl';
  const textRecords = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement?.closest('script, style, svg, .toast, .project-counter, .language-status')) continue;
    const original = node.nodeValue;
    const key = original.trim();
    if (!Object.hasOwn(english, key)) continue;
    const start = original.indexOf(key);
    textRecords.push({ node, key, before: original.slice(0, start), after: original.slice(start + key.length) });
  }

  const attributeRecords = [];
  document.querySelectorAll('[aria-label], [title]').forEach((element) => {
    for (const attribute of ['aria-label', 'title']) {
      const original = element.getAttribute(attribute);
      if (original && Object.hasOwn(english, original)) {
        attributeRecords.push({ element, attribute, original });
      }
    }
  });
  const metadata = [...document.querySelectorAll('meta[name="description"], meta[property="og:description"]')]
    .map((element) => ({ element, original: element.content }));

  function t(text, values = {}) {
    const translated = language === 'en' ? (english[text] ?? text) : text;
    return translated.replace(/\{(\w+)\}/g, (placeholder, key) => String(values[key] ?? placeholder));
  }

  function setLanguage(next, { remember = true, updateUrl = true, announce = true } = {}) {
    if (!['pl', 'en'].includes(next)) return;
    language = next;
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;

    textRecords.forEach(({ node, key, before, after }) => {
      if (node.isConnected) node.nodeValue = before + t(key) + after;
    });
    attributeRecords.forEach(({ element, attribute, original }) => {
      element.setAttribute(attribute, t(original));
    });
    metadata.forEach(({ element, original }) => { element.content = t(original); });
    document.querySelectorAll('button[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    if (remember) {
      try { localStorage.setItem('griniuu-language', language); } catch { /* Optional storage. */ }
    }
    if (updateUrl) {
      try {
        const url = new URL(window.location.href);
        if (language === 'en') url.searchParams.set('lang', 'en');
        else url.searchParams.delete('lang');
        window.history.replaceState(window.history.state, '', url.href);
      } catch { /* Switching also works when opened as a local file. */ }
    }

    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
    if (announce) document.querySelector('.language-status').textContent = t('Ustawiono język polski.');
  }

  window.PORTFOLIO_I18N = Object.freeze({
    t,
    setLanguage,
    get language() { return language; }
  });
  document.querySelectorAll('button[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  let preferred = 'pl';
  try {
    const saved = localStorage.getItem('griniuu-language');
    if (['pl', 'en'].includes(saved)) preferred = saved;
  } catch { /* The default stays Polish. */ }
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (['pl', 'en'].includes(requested)) preferred = requested;
  setLanguage(preferred, { remember: false, updateUrl: false, announce: false });
})();
