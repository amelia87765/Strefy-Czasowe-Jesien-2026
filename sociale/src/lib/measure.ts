export function gcd(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const next = x % y
    x = y
    y = next
  }
  return x
}

export function pixelLabel(width: number, height: number): string {
  return `${width}×${height}`
}

export function ratioLabel(width: number, height: number): string {
  const divisor = gcd(width, height)
  if (divisor === 0) return '—'
  const rw = width / divisor
  const rh = height / divisor
  if (rw > 30 || rh > 30) {
    return `${(width / height).toFixed(2)}:1`
  }
  return `${rw}:${rh}`
}

export function slugSize(platform: string, kind: string, width: number, height: number): string {
  return `${platform}-${kind}-${width}x${height}.png`
}
