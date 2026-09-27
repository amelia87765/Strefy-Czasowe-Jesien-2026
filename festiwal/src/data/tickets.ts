import type { Lang } from '@/data/site'

/** Widget sprzedaży Going (wpinka). Slugi są w adresie wydarzenia w Going. */
export const GOING = {
  script: 'https://places-script.goingapp.pl/script.js',
  version: '1.0.7',
  eventSlug: 'strefy-czasowe-2026-1-jesien',
  rundateSlug: 'gdynia-pazdziernik-2026',
}

export const goingCopy: Record<Lang, { loading: string; fallback: string }> = {
  pl: {
    loading: 'Trwa ładowanie formularza sprzedaży.',
    fallback: 'Formularz nie działa? Kup bilety w Going.',
  },
  en: {
    loading: 'The sales form is loading.',
    fallback: 'Not working? Buy tickets on Going.',
  },
}
