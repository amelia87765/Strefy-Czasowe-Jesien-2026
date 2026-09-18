# Smooth Sail Intranet

Kompletny projekt React + Tailwind CSS, uruchamiany i budowany przez Node.js. Zawiera aktualny ekran logowania Smooth Sail z pomarańczowymi akcentami, językami PL / EN, zapamiętywaniem języka i motywu, jasnym trybem kontrastowym oraz obrotowym logo.

## Szybkie uruchomienie

Zainstaluj Node.js 24 LTS. Otwórz terminal w rozpakowanym folderze projektu.

```sh
npx pnpm@11.19.0 install --frozen-lockfile
npx pnpm@11.19.0 dev
```

Otwórz adres pokazany w terminalu. Domyślnie: http://127.0.0.1:5173.

Można również użyć `npm install` i `npm run dev`. Do odtwarzalnej instalacji z dołączonego pliku blokady używaj pnpm.

## Gotowa wersja bez instalowania zależności

Paczka zawiera zbudowany folder `dist`. Mając Node.js, uruchom:

```sh
node server.mjs
```

Otwórz http://127.0.0.1:3000. Serwer obsługuje gotowe pliki lokalnie. Do konfiguracji adresu nasłuchiwania służy zmienna `HOST`, a portu `PORT`.

Nie otwieraj `index.html` dwuklikiem. Moduły i zasoby strony wymagają serwera HTTP.

## Budowanie i sprawdzanie

```sh
npx pnpm@11.19.0 build
npx pnpm@11.19.0 test
npx pnpm@11.19.0 start
```

`build` tworzy `dist`. `test` sprawdza kompletność tłumaczeń i serwer Node, w tym odmowę przyjmowania danych logowania. `start` serwuje wynik kompilacji.

## Pliki

- `src/App.jsx`: ekran logowania, stan języka i motywu, walidacja formularza, okno pomocy.
- `src/components/RotatingLogo.jsx`: pikselowe logo 64 px, grubość 5 px i ciągłe boki. W nagłówku jest powiększone dwukrotnie.
- `src/components/Clock.jsx`: zegar w strefie Europe/Warsaw.
- `src/translations.js`: wszystkie teksty PL / EN.
- `src/styles.css`: Tailwind, palety kolorów, responsywność i animacja.
- `public/assets/logo-pixel.png`: źródłowa grafika logo.
- `public/assets/terminal.ttf`: lokalny font VT323.
- `public/favicon.svg`: ikona strony.
- `index.html`: punkt wejścia Vite.
- `vite.config.js`: integracja Reacta i Tailwinda.
- `server.mjs`: serwer plików w Node.js, bez dodatkowych zależności.
- `package.json`, `pnpm-lock.yaml`: polecenia i wersje zależności.
- `tests/project.test.mjs`: testy projektu.
- `LICENSES/VT323-OFL.txt`: licencja użytego fontu.
- `dist`: gotowa wersja strony do hostowania.

## Logowanie

To działający prototyp interfejsu, a nie system uwierzytelniania. Przycisk logowania sprawdza pola i pokazuje komunikat o podglądzie. Hasła nie są wysyłane do serwera ani zapisywane w przeglądarce. Okno odzyskiwania dostępu pokazuje informację o kontakcie z administratorem, nie wysyła wiadomości.

Przed udostępnieniem rzeczywistego intranetu trzeba podłączyć logowanie, sesje, uprawnienia i odzyskiwanie hasła. Serwer Node w tej paczce udostępnia wyłącznie statyczne pliki. Samo wdrożenie folderu `dist` nie zapewnia prywatności ani kontroli dostępu.

## Wdrożenie

Folder `dist` można umieścić na hostingu statycznym albo serwować przez `server.mjs`. Projekt zakłada wdrożenie pod główną ścieżką domeny, np. `https://intranet.example.com/`. Dla wdrożenia w podfolderze trzeba dostosować `base` w konfiguracji Vite i bezwzględne ścieżki zasobów.

Źródła nie wymagają konta Sites. Archiwum nie zawiera historii Git, identyfikatorów prywatnego hostingu, tokenów ani folderu `node_modules`. Zależności są odtwarzane z pliku blokady.

## Grafika i fonty

Logo bazuje na dostarczonej grafice Smooth Sail, następnie opracowanej w wersji pikselowej. Font VT323 jest dołączony na warunkach SIL Open Font License. Zależności React, Vite i Tailwind zachowują swoje licencje w instalowanych pakietach.
