import { useLayoutEffect, useRef } from 'react'

/**
 * Zmniejsza czcionkę elementu tylko wtedy, gdy tekst nie mieści się w jego ramce.
 * Rozmiar bazowy pochodzi z klasy CSS; `minRatio` to najmniejszy dopuszczalny ułamek tego rozmiaru.
 * Element musi mieć ograniczoną szerokość/wysokość i `overflow: hidden`.
 */
export function useFitText<T extends HTMLElement>(minRatio: number, key: string) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Przy ciasnej interlinii litery wystają poza linię o ułamek wysokości, to nie jest brak miejsca.
    const fits = () => {
      const slack = parseFloat(getComputedStyle(el).fontSize) * 0.4
      return el.scrollHeight <= el.clientHeight + slack && el.scrollWidth <= el.clientWidth + 1
    }
    const fit = () => {
      el.style.fontSize = ''
      if (fits()) return
      const max = parseFloat(getComputedStyle(el).fontSize)
      let lo = max * minRatio
      let hi = max
      for (let step = 0; step < 10; step++) {
        const mid = (lo + hi) / 2
        el.style.fontSize = `${mid}px`
        if (fits()) lo = mid
        else hi = mid
      }
      el.style.fontSize = `${lo}px`
    }
    fit()
    void document.fonts.ready.then(fit)
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [minRatio, key])

  return ref
}
