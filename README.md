# Kacper Janiszewski / Griniuu — portfolio

Polskie portfolio programisty. Ciemny i jasny motyw, animacje przewijania, filtrowanie projektów, okna ze szczegółami, kopiowanie nicku i responsywna nawigacja. Bez procesu budowania i bez zależności npm.

## Uruchomienie

Wymagany Node.js 18 lub nowszy.

```sh
npm run dev
```

W Windows PowerShell, jeśli lokalna polityka blokuje skrypty npm, użyj `npm.cmd run dev` albo `node scripts/serve.mjs`.

Otwórz `http://localhost:4173`. Zatrzymaj serwer przez Ctrl+C.

```sh
npm run check
```

## Uzupełnienie kontaktu

Edytuj `dist/config.js`:

```js
window.PORTFOLIO_CONFIG = {
  nickname: 'Griniuu',
  email: 'twoj-adres@example.com',
  socials: {
    github: 'https://github.com/Griniuu',
    instagram: 'https://www.instagram.com/kacperj13/',
    twitch: 'https://www.twitch.tv/griniuu',
    kick: 'https://kick.com/griniuuu',
    steam: 'https://steamcommunity.com/profiles/76561198359721222/'
  },
  projects: {
    panelgracza: 'https://panelgracza.pl',
    lootstrefa: 'https://lootstrefatcg.pl',
    rozaniec: 'https://adres-twojego-projektu.pl'
  }
};
```

Po podaniu adresów automatycznie pojawią się odpowiednie przyciski. Puste wartości nie tworzą fikcyjnych linków. E-mail otwiera program pocztowy odwiedzającego; strona nie ma formularza ani serwera wysyłającego wiadomości.

Profile społecznościowe znajdują się w `socials`. Pusta wartość ukrywa daną kartę. Linki w HTML działają także bez JavaScript; przy ręcznej zmianie adresu warto uaktualnić również jego odpowiednik w `dist/index.html`.

## Pliki

- `dist/index.html` — struktura, polska treść i oryginalne ilustracje SVG/CSS.
- `dist/styles.css` — układ, motywy i animacje; obsługuje ograniczenie ruchu w ustawieniach systemu.
- `dist/app.js` — nawigacja, filtry, okna projektów i konfiguracja kontaktu.
- `dist/config.js` — linki do uzupełnienia.
- `scripts/serve.mjs` — lokalny serwer statyczny.

Do publikacji na zwykłym hostingu wystarczy zawartość folderu `dist`. Fonty pobierają się z Google Fonts; przy braku połączenia strona korzysta z czcionek systemowych. Grafiki projektów to autorskie wizualizacje, a nie zrzuty rzeczywistych stron. Dokładna technologia poszczególnych projektów nie została przypisana bez potwierdzenia.
