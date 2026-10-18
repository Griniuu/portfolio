# Kacper Janiszewski / Griniuu — portfolio

Portfolio pasjonata informatyki i programisty w językach polskim i angielskim. Ciemny i jasny motyw, animacje przewijania, filtrowanie projektów, okna ze szczegółami, kopiowanie nicku i responsywna nawigacja. Bez procesu budowania i bez zależności npm.

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
  email: 'kacper.janiszewski@poczta.onet.pl',
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

## Języki PL / EN

Przełącznik w nawigacji tłumaczy treść, opisy projektów, komunikaty, etykiety dostępności i opis strony. Wybór zapamiętuje się w przeglądarce. Link z `?lang=en` otwiera stronę po angielsku; parametr ma pierwszeństwo przed zapamiętanym językiem. Bez JavaScript dostępna jest polska wersja oraz bezpośredni kontakt e-mail.

Tłumaczenia znajdują się w `dist/i18n.js`. Kluczem jest oryginalny polski tekst, a wartością jego angielski odpowiednik. Przy zmianie polskiej treści należy uaktualnić odpowiadający jej wpis. Oryginalne nazwy projektów pozostają bez tłumaczenia.

## Galerie projektów

Po kliknięciu projektu jego okno może zawierać wiele zdjęć, screenów i podglądów kodu. Miniatury i strzałki przełączają materiały. Kliknięcie dużego obrazu otwiera powiększenie, a „Otwórz oryginał” pozwala zobaczyć pełny plik. Działają też strzałki klawiatury. Escape zamyka najpierw powiększenie, a następnie szczegóły projektu.

Materiały znajdują się w `dist/assets/projects/`. Panel Gracza i Loot Strefa TCG mają po sześć podglądów rzeczywistego kodu. Galerie zawierają kod i mogą być uzupełniane wyłącznie rzeczywistymi zrzutami gotowego interfejsu; banery, logo i samodzielne ilustracje nie są dodawane. Podglądy kodu SVG pokazują dokładne fragmenty plików źródłowych z numerami linii. Można je odtworzyć poleceniem:

```sh
node scripts/prepare-project-media.mjs "folder-z-kodem-panelu-gracza" "folder-z-kodem-loot-strefy"
```

Eksport kodu obejmuje wyłącznie dwanaście przejrzanych funkcji: algorytmy kalkulatora i planowania zakupów, reguły wyposażenia, odczyt koszyka, rekomendacje, walidację oraz parametry i opisy produktów. Nie kopiuje całych plików, ustawień serwera, danych użytkowników ani plików `.env`. Każdy fragment ma zapisaną sumę SHA-256 w `scripts/reviewed-project-code.mjs`; zmiana jego treści zatrzymuje eksport i wymaga ponownego przeglądu. `npm run check` sprawdza zgodność widocznego kodu i metadanych SVG z tymi fragmentami oraz brak lokalnych ścieżek i typowych oznaczeń danych dostępowych.

Nowe zdjęcie skopiuj do katalogu odpowiedniego projektu i dopisz obiekt do jego tablicy w `galleries` w pliku `dist/config.js`:

```js
{
  src: 'assets/projects/panelgracza/strona-glowna.webp',
  kind: 'screenshot',
  alt: { pl: 'Widok strony głównej Panelu Gracza.', en: 'Panel Gracza homepage.' },
  caption: { pl: 'Strona główna projektu.', en: 'Project homepage.' }
}
```

W konfiguracji galerii używaj `kind: 'screenshot'` dla prawdziwych screenów interfejsu lub `kind: 'code'` dla podglądów kodu. Opisy mogą być zwykłym tekstem albo obiektem `{ pl, en }`. Pusta tablica, np. dla Twojego Różańca, zachowuje dotychczasową ilustrację. Brakujący plik pokazuje komunikat i pozwala przejść do kolejnego materiału.

Przez WinSCP prześlij zawartość `dist`, **łącznie z plikiem `gallery.js` i całym katalogiem `assets`**, do katalogu strony. Archiwizacja nie jest potrzebna.

## Aktualizacje na hostingu i pamięć podręczna

Hosting griniuu.pl zwracał dla plików JavaScript nagłówek `Cache-Control: public, max-age=604800`, czyli pozwalał przeglądarce używać zapisanej kopii przez siedem dni. Sama synchronizacja WinSCP nie usuwa kopii zapisanych w przeglądarce.

Lokalne adresy CSS, JavaScript, ikony i obrazów galerii zawierają teraz `?v=` z wersją wyliczoną z zawartości pliku. Po ręcznej edycji plików przed synchronizacją uruchom w katalogu projektu:

```sh
npm.cmd run prepare:upload
```

Polecenie nie tworzy archiwum. Aktualizuje odnośniki w `dist/config.js` i `dist/index.html`; te pliki też trzeba przesłać na serwer. Następnie zsynchronizuj zawartość `dist` w kierunku komputera → serwer. Przy pierwszym wdrożeniu tej poprawki odśwież stronę przez Ctrl+F5. Serwer nie wymaga Node.js — polecenie przygotowuje tylko lokalne pliki statyczne.

## Pliki

- `dist/index.html` — struktura, polska treść i oryginalne ilustracje SVG/CSS.
- `dist/styles.css` — układ, motywy i animacje; obsługuje ograniczenie ruchu w ustawieniach systemu.
- `dist/app.js` — nawigacja, filtry, okna projektów i konfiguracja kontaktu.
- `dist/config.js` — linki do uzupełnienia.
- `dist/i18n.js` — tłumaczenia i przełączanie języka.
- `dist/gallery.js` — galerie, miniatury i powiększanie materiałów projektu.
- `dist/assets/projects/` — grafiki i podglądy kodu przypisane do projektów.
- `scripts/serve.mjs` — lokalny serwer statyczny.

Do publikacji na zwykłym hostingu wystarczy zawartość folderu `dist`. Fonty pobierają się z Google Fonts; przy braku połączenia strona korzysta z czcionek systemowych. Ilustracje na kartach projektów to wizualizacje. Galerie zawierają podglądy rzeczywistego kodu i są przygotowane na zrzuty gotowego interfejsu.
