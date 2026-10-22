import { LARGE_SIZE_MIN_FACTOR, LARGE_SIZE_STEP } from '@/data/typography'
import {
  adjustSelectionSize,
  LOCAL_SIZE_MAX,
  LOCAL_SIZE_MIN,
  LOCAL_SIZE_STEP,
  selectionHasMark,
  selectionInEditor,
  selectionSizeFactor,
  toggleTextMark,
  type TextMark,
} from '@/lib/textMarks'
import { normalizeBrandTerms } from '@/lib/brandTerms'
import { useEffect, useRef, useState } from 'react'

type RichTextFieldProps = {
  value: string
  onChange: (html: string) => void
  mode: 'small' | 'large'
  typeSizeFactor?: number
  onTypeSizeFactor?: (value: number) => void
}

function getTextOffset(
  root: HTMLDivElement,
  nodes: { node: Text; start: number; end: number }[],
  target: Node,
  offset: number,
): number {
  const textNode = nodes.find(({ node }) => node === target)
  if (textNode) return textNode.start + offset

  const range = document.createRange()
  range.selectNodeContents(root)
  range.setEnd(target, offset)
  return range.toString().length
}

function getTextPosition(
  nodes: { node: Text; start: number; end: number }[],
  position: number,
): { node: Text; offset: number } | null {
  const textNode = nodes.find(({ start, end }) => position >= start && position <= end)
  return textNode ? { node: textNode.node, offset: position - textNode.start } : null
}

function MarkButton({
  label,
  title,
  active,
  extraClass,
  onToggle,
}: {
  label: string
  title: string
  active: boolean
  extraClass?: string
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      aria-pressed={active}
      className={`min-h-9 rounded-full px-3 text-xs font-medium ${
        active ? 'bg-ink text-white' : 'border border-line bg-white text-ink'
      } ${extraClass ?? ''}`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onToggle}
    >
      {label}
    </button>
  )
}

export function RichTextField({
  value,
  onChange,
  mode,
  typeSizeFactor = 1,
  onTypeSizeFactor,
}: RichTextFieldProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [italicOn, setItalicOn] = useState(false)
  const [boldOn, setBoldOn] = useState(false)
  const [h3On, setH3On] = useState(false)
  const [hasSelection, setHasSelection] = useState(false)
  const [localSize, setLocalSize] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (document.activeElement === el) return
    if (el.innerHTML !== value) el.innerHTML = value
  }, [value])

  const refreshMarks = () => {
    const el = ref.current
    if (!el) return
    setItalicOn(selectionHasMark(el, 'italic'))
    setBoldOn(selectionHasMark(el, 'bold'))
    setH3On(selectionHasMark(el, 'h3'))
    const range = selectionInEditor(el)
    const selected = !!range && !range.collapsed
    setHasSelection(selected)
    setLocalSize(selected ? (selectionSizeFactor(el) ?? 1) : 1)
  }

  useEffect(() => {
    document.addEventListener('selectionchange', refreshMarks)
    return () => document.removeEventListener('selectionchange', refreshMarks)
  }, [])

  const apply = (mark: TextMark) => {
    const el = ref.current
    if (!el) return
    el.focus()
    toggleTextMark(el, mark)
    onChange(el.innerHTML)
    refreshMarks()
  }

  const normalizeLargeText = (root: HTMLDivElement) => {
    if (mode !== 'large') return

    const textNodes: { node: Text; start: number; end: number }[] = []
    const selection = window.getSelection()
    const selectionPoints =
      selection?.anchorNode && selection.focusNode
        ? {
            anchorNode: selection.anchorNode,
            anchorOffset: selection.anchorOffset,
            focusNode: selection.focusNode,
            focusOffset: selection.focusOffset,
            collapsed: selection.isCollapsed,
          }
        : null
    let text = ''
    const appendBoundary = () => {
      if (text && !text.endsWith('\n')) text += '\n'
    }
    const collect = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const value = node.textContent ?? ''
        textNodes.push({ node: node as Text, start: text.length, end: text.length + value.length })
        text += value
        return
      }
      if (!(node instanceof HTMLElement)) return
      if (node.tagName === 'BR') {
        text += '\n'
        return
      }

      const isBlock = node !== root && (node.tagName === 'DIV' || node.tagName === 'P')
      if (isBlock) appendBoundary()
      for (const child of Array.from(node.childNodes)) collect(child)
      if (isBlock) appendBoundary()
    }
    collect(root)

    const selectionOffsets =
      selectionPoints && selection
        ? {
            anchor: getTextOffset(root, textNodes, selectionPoints.anchorNode, selectionPoints.anchorOffset),
            focus: getTextOffset(root, textNodes, selectionPoints.focusNode, selectionPoints.focusOffset),
            collapsed: selectionPoints.collapsed,
          }
        : null
    const normalized = normalizeBrandTerms(text)
    if (normalized.length !== text.length || normalized === text) return
    for (const { node, start, end } of textNodes) {
      node.data = normalized.slice(start, end)
    }

    if (selection && selectionOffsets) {
      const anchor = getTextPosition(textNodes, selectionOffsets.anchor)
      const focus = getTextPosition(textNodes, selectionOffsets.focus)
      if (anchor && focus) {
        const range = document.createRange()
        range.setStart(anchor.node, anchor.offset)
        range.setEnd(focus.node, focus.offset)
        selection.removeAllRanges()
        selection.addRange(range)
        if (selectionOffsets.collapsed) selection.collapse(anchor.node, anchor.offset)
      }
    }
  }

  return (
    <div className="block text-xs">
      <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
        Text
      </span>
      <div className="mb-1.5 flex flex-wrap gap-1.5">
        {mode === 'large' ? (
          <MarkButton
            label="Italic"
            title="Italic · URW Palladio. Click again to return to Classico."
            extraClass="italic"
            active={italicOn}
            onToggle={() => apply('italic')}
          />
        ) : (
          <>
            <MarkButton
              label="Bold"
              title="Bold · Hanken Grotesk. Click again to return to Regular."
              extraClass="font-semibold"
              active={boldOn}
              onToggle={() => apply('bold')}
            />
            <MarkButton
              label="H3"
              title="H3 · URW Classico. Click again to return to Hanken Grotesk."
              active={h3On}
              onToggle={() => apply('h3')}
            />
          </>
        )}
      </div>
      <div
        ref={ref}
        className={`h-36 w-full overflow-auto rounded-md border border-line px-3 py-2 text-sm leading-snug whitespace-pre-wrap text-ink outline-none [&_em]:italic [&_i]:italic ${
          mode === 'large'
            ? 'font-classico [&_em]:font-palladio [&_i]:font-palladio'
            : 'font-hanken font-normal [&_strong]:font-hanken [&_strong]:font-bold [&_b]:font-hanken [&_b]:font-bold [&_[data-h3]]:font-classico [&_[data-h3]]:font-normal'
        }`}
        contentEditable
        role="textbox"
        aria-multiline="true"
        spellCheck
        suppressContentEditableWarning
        onInput={(event) => {
          const inputEvent = event.nativeEvent
          if (
            inputEvent instanceof InputEvent &&
            inputEvent.inputType === 'insertText' &&
            inputEvent.data === ' '
          ) {
            normalizeLargeText(event.currentTarget)
          }
          onChange(event.currentTarget.innerHTML)
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          event.preventDefault()
          if (!document.execCommand('insertLineBreak')) {
            document.execCommand('insertHTML', false, '<br>')
          }
          const el = ref.current
          if (el) onChange(el.innerHTML)
        }}
        onKeyUp={refreshMarks}
        onMouseUp={refreshMarks}
        onPaste={(event) => {
          event.preventDefault()
          const text = event.clipboardData.getData('text/plain')
          document.execCommand('insertText', false, text)
        }}
      />
      {mode === 'large' && onTypeSizeFactor ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            title={hasSelection ? 'Smaller selected text' : 'Smaller whole text'}
            className="min-h-9 rounded-full border border-line bg-white px-3 text-xs font-medium disabled:opacity-40"
            disabled={
              hasSelection
                ? localSize <= LOCAL_SIZE_MIN + 0.001
                : typeSizeFactor <= LARGE_SIZE_MIN_FACTOR + 0.001
            }
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              const el = ref.current
              if (!el) return
              el.focus()
              if (adjustSelectionSize(el, -LOCAL_SIZE_STEP)) {
                onChange(el.innerHTML)
                refreshMarks()
                return
              }
              onTypeSizeFactor(Math.max(LARGE_SIZE_MIN_FACTOR, typeSizeFactor - LARGE_SIZE_STEP))
            }}
          >
            A−
          </button>
          <button
            type="button"
            title={hasSelection ? 'Larger selected text' : 'Larger whole text'}
            className="min-h-9 rounded-full border border-line bg-white px-3 text-xs font-medium disabled:opacity-40"
            disabled={hasSelection ? localSize >= LOCAL_SIZE_MAX - 0.001 : typeSizeFactor >= 1}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              const el = ref.current
              if (!el) return
              el.focus()
              if (adjustSelectionSize(el, LOCAL_SIZE_STEP)) {
                onChange(el.innerHTML)
                refreshMarks()
                return
              }
              onTypeSizeFactor(Math.min(1, typeSizeFactor + LARGE_SIZE_STEP))
            }}
          >
            A+
          </button>
        </div>
      ) : null}
      <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
        {mode === 'large'
          ? 'Select words, then Italic or A+/A−. Click Italic again to undo. With no selection, size changes the whole text.'
          : 'Select words, then Bold or H3. Click the same button again to undo.'}
      </p>
    </div>
  )
}
