function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.trim().replace('#', '')
  const value = raw.length === 3 ? raw.split('').map((ch) => ch + ch).join('') : raw
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function channel(value: number): number {
  const s = value / 255
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b)
}

export function contrastRatio(foreground: string, background: string): number | null {
  const a = luminance(foreground)
  const b = luminance(background)
  if (a === null || b === null) return null
  const lighter = Math.max(a, b)
  const darker = Math.min(a, b)
  return (lighter + 0.05) / (darker + 0.05)
}

export function contrastPasses(
  foreground: string,
  background: string,
  largeText: boolean,
): boolean {
  const ratio = contrastRatio(foreground, background)
  if (ratio === null) return false
  return ratio >= (largeText ? 3 : 4.5)
}
