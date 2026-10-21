const brandTerms =
  /(?<![\p{L}\p{M}])(stref(?:y|om|ami|ach)?)(?:[ \t\u00a0]+czasow(?:ymi|ych|ym|e))?(?![\p{L}\p{M}])/giu

export function normalizeBrandTerms(text: string): string {
  return text.replace(brandTerms, (term) => term.toLocaleUpperCase('pl-PL'))
}
