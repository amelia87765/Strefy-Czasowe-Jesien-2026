import { canvasFont, faceFor, scaledSize, TYPE, type TextKind, type TextRole } from '@/data/typography'
import { glueUnits, type WrapMode } from '@/lib/textLayout'

export type RichRun = { text: string; role: TextRole }

type LineAtom = { text: string; role: TextRole; size: number }

export function parseRichText(html: string, kind: TextKind): RichRun[] {
  if (!html.trim()) return []
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html')
  const root = doc.body.firstElementChild
  if (!root) return [{ text: html, role: 'regular' }]
  const runs: RichRun[] = []
  for (const child of Array.from(root.childNodes)) walk(child, 'regular', kind, runs)
  return mergeRuns(runs)
}

function walk(node: Node, role: TextRole, kind: TextKind, runs: RichRun[]) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? ''
    if (text) runs.push({ text, role })
    return
  }
  if (!(node instanceof HTMLElement)) return
  const tag = node.tagName
  if (tag === 'BR') {
    const parent = node.parentElement
    const onlyBreak = parent && (parent.tagName === 'DIV' || parent.tagName === 'P') && parent.childNodes.length === 1
    if (!onlyBreak) runs.push({ text: '\n', role })
    return
  }
  let next = role
  if (kind === 'large' && (tag === 'EM' || tag === 'I')) next = 'italic'
  if (kind === 'small' && (tag === 'STRONG' || tag === 'B')) next = 'bold'
  if (kind === 'small' && tag === 'SPAN' && node.hasAttribute('data-h3')) next = 'h3'
  const block = tag === 'DIV' || tag === 'P'
  for (const child of Array.from(node.childNodes)) walk(child, next, kind, runs)
  if (block) runs.push({ text: '\n', role: next })
}

function mergeRuns(runs: RichRun[]): RichRun[] {
  const out: RichRun[] = []
  for (const run of runs) {
    const last = out[out.length - 1]
    if (last && last.role === run.role) last.text += run.text
    else out.push({ ...run })
  }
  while (out.length > 0 && out[out.length - 1]?.text === '\n') out.pop()
  return out.filter((run) => run.text.length > 0)
}

function roleSize(kind: TextKind, role: TextRole, scale: number): number {
  return scaledSize(faceFor(kind, role), scale)
}

function setFace(ctx: CanvasRenderingContext2D, kind: TextKind, role: TextRole, scale: number) {
  const face = faceFor(kind, role)
  ctx.font = canvasFont(face, roleSize(kind, role, scale))
}

function measureRun(ctx: CanvasRenderingContext2D, kind: TextKind, role: TextRole, text: string, scale: number) {
  setFace(ctx, kind, role, scale)
  return ctx.measureText(text).width
}

function paragraphs(runs: RichRun[]): RichRun[][] {
  const groups: RichRun[][] = [[]]
  for (const run of runs) {
    const parts = run.text.split('\n')
    parts.forEach((part, index) => {
      if (part) groups[groups.length - 1]?.push({ text: part, role: run.role })
      if (index < parts.length - 1) groups.push([])
    })
  }
  return groups
}

function wordGroups(runs: RichRun[]): { word: string; atoms: { text: string; role: TextRole }[] }[] {
  const atoms: { text: string; role: TextRole }[] = []
  for (const run of runs) {
    for (const bit of run.text.split(/(\s+)/)) {
      if (bit) atoms.push({ text: bit, role: run.role })
    }
  }
  const groups: { word: string; atoms: { text: string; role: TextRole }[] }[] = []
  let current: { text: string; role: TextRole }[] = []
  const flush = () => {
    if (current.length === 0) return
    groups.push({ word: current.map((atom) => atom.text).join(''), atoms: current })
    current = []
  }
  for (const atom of atoms) {
    if (/^\s+$/.test(atom.text)) flush()
    else current.push(atom)
  }
  flush()
  return groups
}

function wrapParagraph(
  ctx: CanvasRenderingContext2D,
  runs: RichRun[],
  maxWidth: number,
  kind: TextKind,
  scale: number,
  mode: WrapMode,
): LineAtom[][] {
  const groups = wordGroups(runs)
  if (groups.length === 0) return [[]]
  const glued = glueUnits(
    groups.map((group) => group.word),
    mode,
  )
  let cursor = 0
  const units: { text: string; role: TextRole }[][] = []
  for (const unit of glued) {
    const need = unit.split(/\s+/).filter(Boolean).length
    const slice: { text: string; role: TextRole }[] = []
    for (let offset = 0; offset < need; offset += 1) {
      const group = groups[cursor + offset]
      if (!group) continue
      if (slice.length > 0) {
        const spaceRole = slice[slice.length - 1]?.role ?? 'regular'
        slice.push({ text: ' ', role: spaceRole })
      }
      slice.push(...group.atoms)
    }
    cursor += need
    units.push(slice)
  }

  const lines: LineAtom[][] = []
  let current: LineAtom[] = []
  let width = 0

  const flush = () => {
    lines.push(current)
    current = []
    width = 0
  }

  for (let i = 0; i < units.length; i += 1) {
    const unit = units[i]
    if (!unit || unit.length === 0) continue
    const atoms: LineAtom[] = []
    if (current.length > 0) {
      const spaceRole = current[current.length - 1]?.role ?? 'regular'
      atoms.push({ text: ' ', role: spaceRole, size: roleSize(kind, spaceRole, scale) })
    }
    for (const part of unit) {
      atoms.push({ text: part.text, role: part.role, size: roleSize(kind, part.role, scale) })
    }
    const extra = atoms.reduce((sum, atom) => sum + measureRun(ctx, kind, atom.role, atom.text, scale), 0)
    if (current.length > 0 && width + extra > maxWidth + 0.5) {
      flush()
      const start = atoms[0]?.text === ' ' ? 1 : 0
      const wrapped = atoms.slice(start)
      current = wrapped
      width = wrapped.reduce((sum, atom) => sum + measureRun(ctx, kind, atom.role, atom.text, scale), 0)
    } else {
      current.push(...atoms)
      width += extra
    }
  }
  if (current.length > 0 || lines.length === 0) flush()
  return lines
}

function wrapAll(
  ctx: CanvasRenderingContext2D,
  runs: RichRun[],
  maxWidth: number,
  kind: TextKind,
  scale: number,
): LineAtom[][] {
  const mode = kind === 'large' ? TYPE.large.wrap : TYPE.small.wrap
  const lines: LineAtom[][] = []
  for (const paragraph of paragraphs(runs)) {
    if (paragraph.length === 0) {
      lines.push([])
      continue
    }
    lines.push(...wrapParagraph(ctx, paragraph, maxWidth, kind, scale, mode))
  }
  return lines
}

function lineHeightOf(kind: TextKind, line: LineAtom[], scale: number): number {
  const ratio = kind === 'large' ? TYPE.large.lineHeight : TYPE.small.lineHeight
  if (line.length === 0) return roleSize(kind, 'regular', scale) * ratio
  const max = Math.max(...line.map((atom) => atom.size))
  return max * ratio
}

function blockHeight(kind: TextKind, lines: LineAtom[][], scale: number): number {
  return lines.reduce((sum, line) => sum + lineHeightOf(kind, line, scale), 0)
}

function lineWidth(ctx: CanvasRenderingContext2D, kind: TextKind, line: LineAtom[], scale: number): number {
  return line.reduce((sum, atom) => sum + measureRun(ctx, kind, atom.role, atom.text, scale), 0)
}

export function fitRichText(
  ctx: CanvasRenderingContext2D,
  html: string,
  kind: TextKind,
  maxWidth: number,
  maxHeight: number,
  sizeFactor = 1,
): { scale: number; maxScale: number; lines: LineAtom[][] } {
  const runs = parseRichText(html, kind)
  if (runs.length === 0) return { scale: 1, maxScale: 1, lines: [] }

  let low = 0.2
  let high = 1
  let best = { scale: low, lines: wrapAll(ctx, runs, maxWidth, kind, low) }

  for (let i = 0; i < 18; i += 1) {
    const mid = (low + high) / 2
    const lines = wrapAll(ctx, runs, maxWidth, kind, mid)
    const height = blockHeight(kind, lines, mid)
    const tooWide = lines.some((line) => lineWidth(ctx, kind, line, mid) > maxWidth + 0.5)
    if (!tooWide && height <= maxHeight) {
      best = { scale: mid, lines }
      low = mid
    } else {
      high = mid
    }
  }

  const minScale = kind === 'large' ? TYPE.large.regular.min / TYPE.large.regular.max : best.scale
  const scale =
    kind === 'large'
      ? Math.min(best.scale, Math.max(minScale, best.scale * sizeFactor))
      : best.scale
  const lines = scale === best.scale ? best.lines : wrapAll(ctx, runs, maxWidth, kind, scale)
  return { scale, maxScale: best.scale, lines }
}

export function drawRichText(
  ctx: CanvasRenderingContext2D,
  lines: LineAtom[][],
  kind: TextKind,
  scale: number,
  box: { x: number; y: number; width: number; height: number },
  align: 'left' | 'center' | 'right',
  vAlign: 'top' | 'center' | 'bottom',
) {
  const total = blockHeight(kind, lines, scale)
  const top =
    vAlign === 'top'
      ? box.y
      : vAlign === 'bottom'
        ? box.y + Math.max(0, box.height - total)
        : box.y + (box.height - total) / 2
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'
  let y = top
  for (const line of lines) {
    const height = lineHeightOf(kind, line, scale)
    const width = lineWidth(ctx, kind, line, scale)
    const maxSize = line.length === 0 ? roleSize(kind, 'regular', scale) : Math.max(...line.map((atom) => atom.size))
    let x =
      align === 'left' ? box.x : align === 'right' ? box.x + box.width - width : box.x + (box.width - width) / 2
    const baseline = y + maxSize * 0.82
    for (const atom of line) {
      setFace(ctx, kind, atom.role, scale)
      ctx.fillText(atom.text, x, baseline)
      x += measureRun(ctx, kind, atom.role, atom.text, scale)
    }
    y += height
  }
}

export async function loadTypefaces(kind: TextKind): Promise<void> {
  const faces =
    kind === 'large'
      ? [TYPE.large.regular, TYPE.large.italic]
      : [TYPE.small.regular, TYPE.small.bold, TYPE.small.h3]
  await Promise.all(faces.map((face) => document.fonts.load(canvasFont(face, face.max))))
}
