# Strefy Czasowe Jesień 2026

Jedno repozytorium, **trzy osobne strony** — nie są podstronami siebie. Każda ma własny folder i własny eksport.

| Folder | Co to jest | Export / start |
| --- | --- | --- |
| `sociale/` | Narzędzie wymiarów postów / rolek / relacji | `npm run export:sociale` → `sociale/dist/` |
| `festiwal/` | One-pager festiwalu (baza pod dalszą pracę) | `npm run export:festiwal` → `festiwal/dist/` |
| `internal/` | Intranet Smooth Sail (logowanie, kalendarz, Google) | `npm run export:internal` + `npm run start:internal` |

Wymaga **Node.js 20+** (w repo `.nvmrc` = 22.23.2). Intranet wymaga **22.13+** i działającego procesu Node — sam upload `dist` nie trzyma sesji ani haseł.

```bash
nvm use
npm install

npm run dev:sociale
npm run dev:festiwal
npm run dev:internal

npm run export:sociale
npm run export:festiwal
npm run export:internal
npm run start:internal
```

Sociale i festiwal: na hosting wrzucasz zawartość wybranego `dist/`. Internal: budujesz `dist`, a na serwerze (OVH z Node / VPS) uruchamiasz `npm run start:internal`. Szczegóły w `internal/README.md`.
