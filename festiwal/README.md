# Strona festiwalu

Strona główna i podstrony pod adresem `smoothsail.pl/strefyczasowe/`. Każda podstrona to osobny plik HTML, więc działa na każdym statycznym hostingu bez przekierowań.

Proporcje projektu: MacBook Pro 16" (1728 px). `1 rem = 10 px` przy tej szerokości, na mniejszych ekranach wszystko skaluje się proporcjonalnie.

## Skrypty

Z katalogu głównego repo (`-w festiwal` = w tym folderze):

| Polecenie | Co robi |
| --- | --- |
| `npm run dev -w festiwal` | Serwer deweloperski: `http://localhost:5174/strefyczasowe/` |
| `npm run build -w festiwal` | Build do `festiwal/dist/` — tę zawartość wrzucasz na hosting |
| `npm run preview -w festiwal` | Podgląd zbudowanej wersji: `http://localhost:4174/strefyczasowe/` |
| `npm run media -w festiwal` | Kompresuje zdjęcia **i wideo** z `media/` do `public/festiwal_foto/` (wideo trwa kilka minut) |
| `npm run media:photos -w festiwal` | To samo, ale tylko zdjęcia — używaj przy dodawaniu zdjęć |
| `npm run masks -w festiwal` | Generuje maski artystów z nakładek „Artist announcement” w social toolu |
| `npm run lint -w festiwal` | Sprawdzenie kodu |

## Gdzie jest treść

| Plik | Co zawiera |
| --- | --- |
| `src/data/site.ts` | Strona główna: teksty PL/EN, link do biletów (`TICKETS_URL`), e-mail, Instagram, Facebook, menu i kafelki |
| `src/data/artists.ts` | Artyści: zdjęcie, kształt, imię, rola, opis, Instagram, kolory podpisu i karty |
| `src/data/pages.ts` | O festiwalu, Sklep, Wolontariusze + kolory tych podstron |
| `src/data/faq.ts` | FAQ: górny skrót i lista pytań |
| `src/index.css` | Kolory edycji (`--color-primary`, `--color-secondary` itd.) i fonty |

Każdy tekst ma wersję `pl` i `en`. Język wybiera się na stronie głównej, podstrony go zapamiętują.

W tekstach:

- link: `[tekst](https://adres)`,
- nowa linia w akapicie: `\n`,
- apostrof: `’` (zwykły `'` przerwie tekst i build się nie uda).

### Klocki podstron (`pages.ts`, `faq.ts`)

Podstrona to lista sekcji oddzielonych kreską, a sekcja to lista klocków: `heading`, `text`, `statement` (duże hasło), `photos` (elipsy), `links`, `embed` (np. widget Going), `faq`. Sekcje i klocki można dodawać, usuwać i przestawiać.

## Zdjęcia i wideo

**Nigdy nie wrzucaj oryginałów prosto do `public/`.** Oryginały trafiają do `festiwal/media/` (folder jest w `.gitignore`), a skrypt zapisuje lekkie wersje do `public/festiwal_foto/`.

| Wrzucasz do | Trafia do | W kodzie wpisujesz |
| --- | --- | --- |
| `media/nazwa.jpg` | `public/festiwal_foto/nazwa.jpg` | `festiwal_foto/nazwa.jpg` |
| `media/artysci/nazwa.jpg` | `public/festiwal_foto/artysci/nazwa.jpg` | `festiwal_foto/artysci/nazwa.jpg` |
| `media/o-festiwalu/nazwa.jpg` | `public/festiwal_foto/o-festiwalu/nazwa.jpg` | `festiwal_foto/o-festiwalu/nazwa.jpg` |
| `media/poprzednia-original.mp4` | `poprzednia-loop.mp4` (8 s, 480p) + `poprzednia.mp4` (1080p) | — |

Zasady:

- Zdjęcia: `.jpg`, `.jpeg` lub `.png`; wynik zawsze `.jpg`, dłuższy bok 1600 px.
- **Nazwy plików małymi literami, bez spacji i polskich znaków** (`renia-maj.jpg`). Serwer rozróżnia wielkość liter — `Foto.JPG` i `foto.jpg` to dla niego dwa różne pliki.
- Skrypt przetwarza wszystkie pliki z `media/` za każdym razem i nadpisuje wyniki — to bezpieczne.
- Po zmianie zdjęć uruchom `npm run media:photos -w festiwal`, po zmianie filmu `npm run media -w festiwal`.
- Nowy podfolder na zdjęcia dopisz do `PHOTO_DIRS` w `scripts/media.mjs`.
- ffmpeg instaluje się razem z `npm install`, nie trzeba go instalować osobno.

## Maski artystów

Kształty są w `public/svg/masks/`, a w `artists.ts` wybierasz je polem `mask`:

- `announcement-1` … `announcement-7` — otwory z nakładek „Artist announcement” w social toolu (`sociale/public/media/Post 1 line/`),
- `union`, `union-1`, `union-2`, `union-3`, `double-blob`, `dual-oval`, `soft-circle`, `triple-oval`, `wave` — kształty z siatek social toola,
- `rounded` — zaokrąglony prostokąt bez maski.

Kształty rozciągają się do pola zdjęcia (tak jak w projekcie).

**Przegenerowanie masek z social toola:** po zmianie lub dodaniu plików w `sociale/public/media/Post 1 line/` uruchom `npm run masks -w festiwal`. Pliki są numerowane według kolejności nazw (`Subtract-1.svg` → `announcement-1.svg` …, `Subtract.svg` na końcu). Jeśli przybył nowy kształt, dopisz jego nazwę do typu `ArtistMask` na górze `artists.ts`.

Własna maska SVG: wrzuć ją do `public/svg/masks/`, dodaj do głównego tagu `<svg>` atrybut `preserveAspectRatio="none"` (bez niego kształt się nie rozciąga) i dopisz nazwę do `ArtistMask`.

## Linie w tle

Tło strony głównej i artystów to `public/lines.svg`, rozciągany na całą wysokość strony. Przy podmianie pliku zachowaj tę samą nazwę i dopisz:

- `preserveAspectRatio="none"` w tagu `<svg>`,
- `vector-effect="non-scaling-stroke"` przy każdej kresce (inaczej kreski grubieją przy rozciąganiu).

## Nowa edycja

1. Kolory: `--color-primary` i `--color-secondary` w `src/index.css` (wartości zimowe i letnie są w komentarzu nad nimi).
2. Zdjęcia i wideo: nowe oryginały do `media/` i `npm run media -w festiwal`.
3. Teksty, data i link do biletów: `src/data/site.ts`.

Nakładki kafelków na stronie głównej (`public/svg/Elipsa_*.svg`, `Union2/4.svg`) mają kolory wpisane w plik, więc trzeba je wyeksportować na nowo w kolorach edycji.

## Nowa podstrona

Wzór to np. `faq/`:

1. Skopiuj folder `faq/` pod nową nazwą, w `index.html` zmień `data-page`, `<title>` i opis.
2. Dopisz stronę w `vite.config.ts` (`rollupOptions.input`).
3. W `src/data/pages.ts` dopisz id do `SubpageId`, kolory do `SUBPAGE_COLORS` i sekcje z treścią.
4. W `src/subpage.tsx` podepnij sekcje w `SECTIONS`.
5. Tytuł podstrony pochodzi z etykiety w menu (`site.ts`), link w menu kończ ukośnikiem (`nowa-strona/`).

## Hosting

Wrzucasz zawartość `festiwal/dist/` do `/strefyczasowe/`. `public/_headers` ustawia cache (pliki z `assets/` na rok, zdjęcia na tydzień) i nagłówki bezpieczeństwa — działa na hostingach, które obsługują ten format (Netlify, Cloudflare Pages). Na innych trzeba to ustawić w konfiguracji serwera.
