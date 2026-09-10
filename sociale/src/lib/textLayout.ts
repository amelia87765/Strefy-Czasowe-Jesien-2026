export type WrapMode = 'body' | 'title'

const LETTER_ORPHANS = new Set(['a', 'i', 'o', 'u', 'w', 'z'])

const TITLE_PREPOSITIONS = new Set([
  'bez',
  'blisko',
  'dla',
  'do',
  'koło',
  'ku',
  'między',
  'mimo',
  'na',
  'nad',
  'naprzeciw',
  'naprzeciwko',
  'obok',
  'od',
  'około',
  'oprócz',
  'po',
  'pod',
  'pomimo',
  'ponad',
  'poniżej',
  'poprzez',
  'pośród',
  'powyżej',
  'poza',
  'przeciw',
  'przeciwko',
  'przed',
  'przez',
  'przy',
  'spod',
  'spośród',
  'spoza',
  'we',
  'według',
  'wobec',
  'wokół',
  'wśród',
  'za',
  'ze',
  'znad',
  'zza',
])

export function measureWidth(ctx: CanvasRenderingContext2D, text: string): number {
  return ctx.measureText(text).width
}

function wordCore(word: string): string {
  return word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')
}

function keepWithNext(word: string, mode: WrapMode): boolean {
  const core = wordCore(word)
  if (!core) return false
  const lower = core.toLowerCase()
  if (LETTER_ORPHANS.has(lower)) return true
  return mode === 'title' && TITLE_PREPOSITIONS.has(lower)
}

export function glueUnits(words: string[], mode: WrapMode): string[] {
  const units: string[] = []
  let index = 0
  while (index < words.length) {
    const word = words[index]
    if (!word) {
      index += 1
      continue
    }
    if (keepWithNext(word, mode) && index + 1 < words.length) {
      const parts = [word]
      index += 1
      while (index < words.length) {
        const next = words[index]
        if (!next) {
          index += 1
          continue
        }
        parts.push(next)
        if (keepWithNext(next, mode) && index + 1 < words.length) {
          index += 1
          continue
        }
        index += 1
        break
      }
      units.push(parts.join(' '))
      continue
    }
    units.push(word)
    index += 1
  }
  return units
}

export function wrapWords(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  mode: WrapMode = 'body',
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return []
  const units = glueUnits(words, mode)

  const lines: string[] = []
  let current: string[] = []

  const flush = () => {
    if (current.length === 0) return
    lines.push(current.join(' '))
    current = []
  }

  for (const unit of units) {
    const trial = current.length === 0 ? unit : `${current.join(' ')} ${unit}`
    if (measureWidth(ctx, trial) <= maxWidth || current.length === 0) {
      current.push(unit)
    } else {
      flush()
      current.push(unit)
    }
  }
  flush()
  return lines
}

export function fitLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  fontFamily: string,
  minSize: number,
  maxSize: number,
  lineHeight = 1.12,
  mode: WrapMode = 'body',
): { fontSize: number; lines: string[] } {
  let low = minSize
  let high = maxSize
  let best = { fontSize: minSize, lines: wrapAt(ctx, text, maxWidth, minSize, fontFamily, mode) }

  for (let i = 0; i < 16; i += 1) {
    const mid = (low + high) / 2
    const lines = wrapAt(ctx, text, maxWidth, mid, fontFamily, mode)
    const height = lines.length * mid * lineHeight
    const tooWide = lines.some((line) => {
      ctx.font = `${mid}px ${fontFamily}`
      return measureWidth(ctx, line) > maxWidth + 0.5
    })
    if (!tooWide && height <= maxHeight) {
      best = { fontSize: mid, lines }
      low = mid
    } else {
      high = mid
    }
  }

  return best
}

function wrapAt(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  mode: WrapMode,
): string[] {
  ctx.font = `${fontSize}px ${fontFamily}`
  return wrapWords(ctx, text, maxWidth, mode)
}

export function wrapName(
  ctx: CanvasRenderingContext2D,
  name: string,
  maxWidth: number,
): string[] {
  const lines = wrapWords(ctx, name, maxWidth, 'title')
  if (lines.length <= 2) return lines.filter(Boolean)
  return [lines[0] ?? '', lines.slice(1).join(' ')].filter(Boolean)
}

export function drawAlignedBlock(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  box: { x: number; y: number; width: number; height: number },
  fontSize: number,
  lineHeight: number,
  align: 'left' | 'center' | 'right',
  vAlign: 'top' | 'center' | 'bottom',
) {
  const total = lines.length * fontSize * lineHeight
  ctx.textAlign = align
  ctx.textBaseline = 'alphabetic'
  const x =
    align === 'left' ? box.x : align === 'right' ? box.x + box.width : box.x + box.width / 2
  const blockTop =
    vAlign === 'top'
      ? box.y
      : vAlign === 'bottom'
        ? box.y + Math.max(0, box.height - total)
        : box.y + (box.height - total) / 2
  let y = blockTop + fontSize * 0.82
  for (const line of lines) {
    ctx.fillText(line, x, y)
    y += fontSize * lineHeight
  }
}

