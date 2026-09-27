const NBSP = '\u00A0'

/**
 * Polskie zasady łamania wierszy: jednoliterowe wyrazy (a, i, o, u, w, z) łączy
 * twardą spacją z następnym słowem, a półpauzę/pauzę z poprzednim, żeby nie zaczynała wiersza.
 */
export function fixOrphans(text: string): string {
  return text
    .replace(/(?<=^|[\s\u00A0(„"«])([aiouwzAIOUWZ]) +/g, `$1${NBSP}`)
    .replace(/ +([–—])/g, `${NBSP}$1`)
}
