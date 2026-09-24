# Smooth Sail Internal

Wewnętrzna przestrzeń załogi: logowanie, kalendarz dostępności / wachty oraz osadzone Google Forms, arkusze i foldery Dysku. Wygląd ekranu logowania zostaje; po zalogowaniu jest ten sam szkielet (topbar, motyw, PL/EN).

To **nie** jest hosting statyczny jak Sociale. Hasła i kalendarz żyją w procesie Node + pliku SQLite.

## Wymagania

- Node.js **22.13+** (w repo `.nvmrc` = 22.23.2)
- `npm install` z **korzenia** repozytorium (publiczny npm, bez pnpm i bez firmowego registry)

```sh
nvm use
npm install
cp internal/.env.example internal/.env
```

W `.env` ustaw login i hasło pierwszego administratora (min. 10 znaków; login może, ale nie musi, być e-mailem). Pliku `.env` nie commituj.

## Uruchomienie

```sh
npm run dev:internal
```

Frontend: http://127.0.0.1:5175 (proxy `/api` → Node na porcie 3000).

Produkcja na OVH (VPS albo hosting z Node, **nie** sam FTP):

```sh
npm run export:internal
npm run start:internal
```

`export` składa frontend do `internal/dist/`. `start` serwuje `dist` i API. Domyślnie http://127.0.0.1:3000 (`HOST` / `PORT` w `.env`).

Na HTTPS ustaw `INTERNAL_SECURE=1`. Jeśli TLS kończy się na proxy: `INTERNAL_TRUST_PROXY=1`.

## Bezpieczeństwo

- Hasła: `scrypt` + sól, nigdy w logach ani w `localStorage`
- Sesja: ciasteczko `HttpOnly; SameSite=Strict`, w bazie tylko hash tokenu
- Limit logowania: 5 prób / 15 min na IP + login
- Role `admin` / `member`; pierwsze logowanie wymusza zmianę hasła tymczasowego (wystarczy nowe hasło, bez powtórzenia tymczasowego)
- Odzyskiwanie hasła: kontakt z administratorem (jak na ekranie logowania)
- CSP, `noindex`, bez iframe-owania samej aplikacji
- Baza: `internal/data/app.sqlite` (w `.gitignore`)

## Kalendarz i zasoby

- Użytkownik zaznacza dostępność (dziś i przyszłość); potwierdzonego dnia nie cofa
- Administrator potwierdza dzień pracy (inne oznaczenie) albo dodaje wydarzenie
- Zespół widzi wydarzenia i **potwierdzone** dni; niepotwierdzoną dostępność widzi tylko właściciel i admin
- Administrator dodaje URL osadzenia Google i przypisuje zasoby do kont. Aplikacja pokazuje iframe tylko uprawnionym osobom. Dostęp do formularza / arkusza / dysku zależy od konta Google w iframe (albo od udostępnienia „każdy z linkiem”), nie od loginu w intranetcie.

## Testy

```sh
npm test -w internal
```
