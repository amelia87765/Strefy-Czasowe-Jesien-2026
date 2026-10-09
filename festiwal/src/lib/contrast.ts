/**
 * Tryb wysokiego kontrastu: atrybut `data-contrast="high"` na <html>.
 * Pierwsze ustawienie robi skrypt w <head> każdego index.html (zapisany wybór albo
 * systemowe „zwiększ kontrast”), żeby strona nie mignęła w zwykłych kolorach.
 */
const KEY = 'strefy-contrast'

export function isHighContrast() {
  return document.documentElement.dataset.contrast === 'high'
}

export function setHighContrast(on: boolean) {
  if (on) document.documentElement.dataset.contrast = 'high'
  else delete document.documentElement.dataset.contrast
  try {
    localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    /* tryb prywatny bez localStorage */
  }
}
