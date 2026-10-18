/* Dane do uzupełnienia. Zmiany są widoczne po odświeżeniu strony. */
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
    rozaniec: ''
  },
  // Podglądy kodu i rzeczywiste screeny interfejsu widoczne po otwarciu projektu.
  // Kolejne materiały dodawaj do odpowiedniej tablicy. src jest ścieżką względem index.html.
  galleries: {
    panelgracza: [
      {
        src: 'assets/projects/panelgracza/kalkulator-kod.svg?v=49842eb8daeb', kind: 'code',
        alt: { pl: 'Kod funkcji maximize_souls z kalkulatora dusz.', en: 'The maximize_souls function from the souls calculator.' },
        caption: { pl: 'Python · obliczanie najlepszej kombinacji zasobów z pamięcią wyników.', en: 'Python · finding the best resource combination with memoization.' }
      },
      {
        src: 'assets/projects/panelgracza/ekwipunek-kod.svg?v=10bf60ea5bbb', kind: 'code',
        alt: { pl: 'Kod reguł miejsc na drify i orby dla przedmiotów epickich.', en: 'Code defining drift and orb slots for epic items.' },
        caption: { pl: 'JavaScript · reguły wyposażenia i liczby dostępnych miejsc.', en: 'JavaScript · equipment rules and available slot counts.' }
      },
      {
        src: 'assets/projects/panelgracza/plan-zakupow-kod.svg?v=2e6f782d8c27', kind: 'code',
        alt: { pl: 'Funkcja optimal_purchase_plan obliczająca plan zakupu zasobów.', en: 'The optimal_purchase_plan function calculating resource purchases.' },
        caption: { pl: 'Python · wybór planu zakupu zasobów o najmniejszym koszcie.', en: 'Python · finding the lowest-cost resource purchase plan.' }
      },
      {
        src: 'assets/projects/panelgracza/kroki-zakupow-kod.svg?v=9088fe85e5ca', kind: 'code',
        alt: { pl: 'Funkcja purchase_steps rozpisująca kolejne zakupy.', en: 'The purchase_steps function producing a sequence of purchases.' },
        caption: { pl: 'Python · rozpisanie planu na kolejne kroki i brakujące zasoby.', en: 'Python · turning the plan into steps and missing resource counts.' }
      },
      {
        src: 'assets/projects/panelgracza/pojemnosc-przedmiotu-kod.svg?v=f98b411d3c4c', kind: 'code',
        alt: { pl: 'Kod obliczania efektywnej pojemności przedmiotu.', en: 'Code calculating effective item capacity.' },
        caption: { pl: 'JavaScript · pojemność przedmiotu z uwzględnieniem jakości.', en: 'JavaScript · item capacity including quality bonuses.' }
      },
      {
        src: 'assets/projects/panelgracza/dopasowanie-orbow-kod.svg?v=78df762fd47d', kind: 'code',
        alt: { pl: 'Kod dobierania typów orbów do miejsca w ekwipunku.', en: 'Code matching orb types to an equipment slot.' },
        caption: { pl: 'JavaScript · filtrowanie typów orbów pasujących do danego miejsca.', en: 'JavaScript · filtering orb types allowed in a given slot.' }
      }
    ],
    lootstrefa: [
      {
        src: 'assets/projects/lootstrefa/koszyk-kod.svg?v=a6e86726fde3', kind: 'code',
        alt: { pl: 'Kod odczytywania i normalizacji koszyka w przeglądarce.', en: 'Code reading and normalizing the browser shopping cart.' },
        caption: { pl: 'JavaScript · odczyt koszyka i normalizacja ilości oraz cen.', en: 'JavaScript · reading the cart and normalizing quantities and prices.' }
      },
      {
        src: 'assets/projects/lootstrefa/produkty-kod.svg?v=f802497d7374', kind: 'code',
        alt: { pl: 'Kod budowania specyfikacji produktu na podstawie szablonu.', en: 'Code building product specifications from a template.' },
        caption: { pl: 'Python · generowanie grup parametrów produktu.', en: 'Python · generating product specification groups.' }
      },
      {
        src: 'assets/projects/lootstrefa/rekomendacje-kod.svg?v=2a2798a05f40', kind: 'code',
        alt: { pl: 'Kod wybierania dostępnych produktów uzupełniających koszyk.', en: 'Code selecting available products to complement the cart.' },
        caption: { pl: 'JavaScript · filtrowanie i sortowanie propozycji produktów.', en: 'JavaScript · filtering and sorting product suggestions.' }
      },
      {
        src: 'assets/projects/lootstrefa/ocena-produktow-kod.svg?v=3a48fdf1bc83', kind: 'code',
        alt: { pl: 'Kod punktowania produktów pod kątem zawartości koszyka.', en: 'Code scoring products against the current cart.' },
        caption: { pl: 'JavaScript · dopasowanie rekomendacji do kart i akcesoriów w koszyku.', en: 'JavaScript · matching recommendations to cards and accessories in the cart.' }
      },
      {
        src: 'assets/projects/lootstrefa/walidacja-nip-kod.svg?v=3c72b8407fd0', kind: 'code',
        alt: { pl: 'Algorytm sprawdzania sumy kontrolnej NIP, bez rzeczywistych danych.', en: 'The NIP checksum validation algorithm without any real personal data.' },
        caption: { pl: 'JavaScript · sprawdzanie poprawności numeru NIP.', en: 'JavaScript · validating a Polish tax identification number.' }
      },
      {
        src: 'assets/projects/lootstrefa/opisy-produktow-kod.svg?v=0112689b1280', kind: 'code',
        alt: { pl: 'Kod zamieniający opis produktu na zwykły tekst.', en: 'Code converting a product description into plain text.' },
        caption: { pl: 'Python · odczyt tekstu z opisu HTML i porządkowanie odstępów.', en: 'Python · extracting text from HTML descriptions and normalizing whitespace.' }
      }
    ],
    rozaniec: []
  }
};
