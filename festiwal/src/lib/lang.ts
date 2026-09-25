import type { Lang } from '@/data/site'

const KEY = 'strefy-lang'

/** Język wybiera strona główna; podstrony tylko go odczytują. */
export function readLang(): Lang {
  try {
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'pl'
  } catch {
    return 'pl'
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* tryb prywatny bez localStorage */
  }
}
