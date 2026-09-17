export type TextMark = 'italic' | 'bold' | 'h3'

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

function textNodesIn(range: Range): Text[] {
  const root = range.commonAncestorContainer
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  if (root instanceof Text) {
    if (root.textContent && range.intersectsNode(root)) nodes.push(root)
    return nodes
  }
  let node = walker.nextNode()
  while (node) {
    if (node instanceof Text && node.textContent && range.intersectsNode(node)) nodes.push(node)
    node = walker.nextNode()
  }
  if (nodes.length === 0 && range.startContainer instanceof Text) nodes.push(range.startContainer)
  return nodes
}

export function selectionHasMark(editor: HTMLElement, mark: TextMark): boolean {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return false
  const range = sel.getRangeAt(0)
  if (!editor.contains(range.commonAncestorContainer)) return false
  if (range.collapsed) return closestMark(range.startContainer, mark) !== null
  const nodes = textNodesIn(range)
  if (nodes.length === 0) return false
  return nodes.every((node) => closestMark(node, mark) !== null)
}

export function toggleTextMark(editor: HTMLElement, mark: TextMark) {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return
  const range = sel.getRangeAt(0)
  if (!editor.contains(range.commonAncestorContainer)) return

  const marked = selectionHasMark(editor, mark)

  if (range.collapsed) {
    const el = closestMark(range.startContainer, mark)
    if (el && marked) unwrapElement(el)
    editor.normalize()
    return
  }

  const frag = range.extractContents()
  for (const other of competing(mark)) unwrapIn(frag, other)
  unwrapIn(frag, mark)

  if (marked) {
    range.insertNode(frag)
    editor.normalize()
    return
  }

  const wrap = createMark(mark)
  wrap.appendChild(frag)
  range.insertNode(wrap)
  editor.normalize()
  const next = document.createRange()
  next.selectNodeContents(wrap)
  sel.removeAllRanges()
  sel.addRange(next)
}
