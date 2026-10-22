export type TextMark = 'italic' | 'bold' | 'h3'

export const LOCAL_SIZE_STEP = 0.05
export const LOCAL_SIZE_MIN = 0.5
export const LOCAL_SIZE_MAX = 1.8

function selector(mark: TextMark): string {
  if (mark === 'italic') return 'em, i'
  if (mark === 'bold') return 'strong, b'
  return '[data-h3]'
}

function createMark(mark: TextMark): HTMLElement {
  if (mark === 'italic') return document.createElement('em')
  if (mark === 'bold') return document.createElement('strong')
  const span = document.createElement('span')
  span.setAttribute('data-h3', '')
  return span
}

function closestMark(node: Node, mark: TextMark): HTMLElement | null {
  const el = node instanceof HTMLElement ? node : node.parentElement
  return el?.closest(selector(mark)) ?? null
}

function unwrapElement(el: HTMLElement) {
  const parent = el.parentNode
  if (!parent) return
  while (el.firstChild) parent.insertBefore(el.firstChild, el)
  parent.removeChild(el)
}

function unwrapIn(root: ParentNode, mark: TextMark) {
  const hits = [...root.querySelectorAll(selector(mark))]
  if (root instanceof HTMLElement && root.matches(selector(mark))) hits.unshift(root)
  for (const hit of hits) unwrapElement(hit as HTMLElement)
}

function competing(mark: TextMark): TextMark[] {
  if (mark === 'bold') return ['h3']
  if (mark === 'h3') return ['bold']
  return []
}

/** Tylko węzły, które naprawdę mają zaznaczone znaki — bez sąsiadów na krawędzi zakresu. */
function textNodesIn(range: Range): Text[] {
  const ancestor = range.commonAncestorContainer
  if (ancestor instanceof Text) {
    const start = range.startContainer === ancestor ? range.startOffset : 0
    const end = range.endContainer === ancestor ? range.endOffset : ancestor.data.length
    return ancestor.data && end > start ? [ancestor] : []
  }

  const walker = document.createTreeWalker(ancestor, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node = walker.nextNode()
  while (node) {
    if (node instanceof Text && node.data && range.intersectsNode(node)) {
      const start = node === range.startContainer ? range.startOffset : 0
      const end = node === range.endContainer ? range.endOffset : node.data.length
      if (end > start) nodes.push(node)
    }
    node = walker.nextNode()
  }
  return nodes
}

export function selectionInEditor(editor: HTMLElement): Range | null {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return null
  const range = sel.getRangeAt(0)
  if (!editor.contains(range.commonAncestorContainer)) return null
  return range
}

export function selectionHasMark(editor: HTMLElement, mark: TextMark): boolean {
  const range = selectionInEditor(editor)
  if (!range) return false
  if (range.collapsed) return closestMark(range.startContainer, mark) !== null
  const nodes = textNodesIn(range)
  if (nodes.length === 0) return false
  return nodes.every((node) => closestMark(node, mark) !== null)
}

function insertAndSelect(range: Range, node: Node) {
  range.insertNode(node)
  const next = document.createRange()
  next.selectNodeContents(node)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(next)
}

function textOffset(root: HTMLElement, target: Node, offset: number): number {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let acc = 0
  let node = walker.nextNode()
  while (node) {
    const text = node as Text
    if (text === target) return acc + offset
    acc += text.data.length
    node = walker.nextNode()
  }
  const range = document.createRange()
  range.selectNodeContents(root)
  try {
    range.setEnd(target, offset)
  } catch {
    return acc
  }
  return range.toString().length
}

function restoreOffsets(root: HTMLElement, start: number, end: number) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let acc = 0
  let startNode: Text | null = null
  let startOff = 0
  let endNode: Text | null = null
  let endOff = 0
  let node = walker.nextNode()
  while (node) {
    const text = node as Text
    const next = acc + text.data.length
    if (!startNode && next >= start) {
      startNode = text
      startOff = start - acc
    }
    if (!endNode && next >= end) {
      endNode = text
      endOff = end - acc
    }
    acc = next
    node = walker.nextNode()
  }
  if (!startNode || !endNode) return
  const range = document.createRange()
  range.setStart(startNode, Math.min(startOff, startNode.data.length))
  range.setEnd(endNode, Math.min(endOff, endNode.data.length))
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

function bookmark(editor: HTMLElement, range: Range) {
  return {
    start: textOffset(editor, range.startContainer, range.startOffset),
    end: textOffset(editor, range.endContainer, range.endOffset),
  }
}

/** Rozetnij rodzeństwo wokół `keep`, żeby parent miał tylko ten węzeł. */
function splitSiblingsAround(parent: HTMLElement, keep: Node) {
  const before: Node[] = []
  const after: Node[] = []
  let seen = false
  for (const child of [...parent.childNodes]) {
    if (child === keep) {
      seen = true
      continue
    }
    if (!seen) before.push(child)
    else after.push(child)
  }
  const grand = parent.parentNode
  if (!grand) return
  if (before.length) {
    const clone = parent.cloneNode(false) as HTMLElement
    before.forEach((node) => clone.appendChild(node))
    grand.insertBefore(clone, parent)
  }
  if (after.length) {
    const clone = parent.cloneNode(false) as HTMLElement
    after.forEach((node) => clone.appendChild(node))
    grand.insertBefore(clone, parent.nextSibling)
  }
}

function splitWrappersBetween(node: Node, stopAt: HTMLElement) {
  let current: Node = node
  while (current.parentNode && current.parentNode !== stopAt) {
    const parent = current.parentNode
    if (!(parent instanceof HTMLElement)) break
    splitSiblingsAround(parent, current)
    current = parent
  }
}

function liftOutOf(node: Node, markEl: HTMLElement) {
  splitWrappersBetween(node, markEl)
  let child: Node = node
  while (child.parentNode && child.parentNode !== markEl) child = child.parentNode
  if (child.parentNode !== markEl) return
  splitSiblingsAround(markEl, child)
  unwrapElement(markEl)
}

function isolateSelectedText(range: Range): Text[] {
  const start = range.startContainer
  const end = range.endContainer
  const startOff = range.startOffset
  const endOff = range.endOffset

  if (start === end && start instanceof Text) {
    let node = start
    if (endOff < node.data.length) node.splitText(endOff)
    if (startOff > 0) node = node.splitText(startOff)
    if (!node.data) return []
    range.setStart(node, 0)
    range.setEnd(node, node.data.length)
    return [node]
  }

  if (end instanceof Text && endOff > 0 && endOff < end.data.length) {
    end.splitText(endOff)
    range.setEnd(end, end.data.length)
  }
  if (start instanceof Text && startOff > 0 && startOff < start.data.length) {
    const right = start.splitText(startOff)
    range.setStart(right, 0)
  }
  return textNodesIn(range)
}

function removeClosestFromSelection(editor: HTMLElement, find: (node: Node) => HTMLElement | null) {
  const range = selectionInEditor(editor)
  if (!range || range.collapsed) return
  const { start, end } = bookmark(editor, range)
  const texts = isolateSelectedText(range)
  for (const text of [...texts].reverse()) {
    const mark = find(text)
    if (mark && editor.contains(mark) && mark !== editor) liftOutOf(text, mark)
  }
  pruneEmpty(editor)
  editor.normalize()
  restoreOffsets(editor, start, end)
}

export function toggleTextMark(editor: HTMLElement, mark: TextMark) {
  const sel = window.getSelection()
  const range = selectionInEditor(editor)
  if (!sel || !range) return
  if (range.collapsed) return

  if (selectionHasMark(editor, mark)) {
    removeClosestFromSelection(editor, (node) => closestMark(node, mark))
    pruneEmpty(editor)
    return
  }

  const frag = range.extractContents()
  for (const other of competing(mark)) unwrapIn(frag, other)
  unwrapIn(frag, mark)
  const wrap = createMark(mark)
  wrap.appendChild(frag)
  insertAndSelect(range, wrap)
  pruneEmpty(editor)
}

function pruneEmpty(editor: HTMLElement) {
  for (const el of [...editor.querySelectorAll('em, i, strong, b, [data-h3], [data-size]')]) {
    if (!el.textContent) el.remove()
  }
}

function sizeOf(node: Node): number {
  const el = node instanceof HTMLElement ? node : node.parentElement
  const sized = el?.closest('[data-size]')
  const raw = sized?.getAttribute('data-size')
  const value = raw ? Number(raw) : 1
  return Number.isFinite(value) && value > 0 ? value : 1
}

export function selectionSizeFactor(editor: HTMLElement): number | null {
  const range = selectionInEditor(editor)
  if (!range || range.collapsed) return null
  const nodes = textNodesIn(range)
  if (nodes.length === 0) return null
  const sizes = nodes.map(sizeOf)
  return sizes.every((size) => Math.abs(size - sizes[0]!) < 0.001) ? sizes[0]! : 1
}

function sizeSpan(factor: number): HTMLElement {
  const span = document.createElement('span')
  span.setAttribute('data-size', String(factor))
  span.style.fontSize = `${factor}em`
  return span
}

function closestSize(node: Node): HTMLElement | null {
  const el = node instanceof HTMLElement ? node : node.parentElement
  return el?.closest('[data-size]') ?? null
}

export function adjustSelectionSize(editor: HTMLElement, delta: number): boolean {
  const sel = window.getSelection()
  const range = selectionInEditor(editor)
  if (!sel || !range || range.collapsed) return false

  const current = selectionSizeFactor(editor) ?? 1
  const next = Math.min(LOCAL_SIZE_MAX, Math.max(LOCAL_SIZE_MIN, Math.round((current + delta) * 100) / 100))
  const { start, end } = bookmark(editor, range)
  removeClosestFromSelection(editor, closestSize)

  if (Math.abs(next - 1) < 0.001) {
    restoreOffsets(editor, start, end)
    return true
  }

  const live = selectionInEditor(editor)
  if (!live || live.collapsed) restoreOffsets(editor, start, end)
  const wrapRange = selectionInEditor(editor)
  if (!wrapRange || wrapRange.collapsed) return true
  const frag = wrapRange.extractContents()
  const wrap = sizeSpan(next)
  wrap.appendChild(frag)
  insertAndSelect(wrapRange, wrap)
  pruneEmpty(editor)
  return true
}
