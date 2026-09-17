import { selectionHasMark, toggleTextMark, type TextMark } from '@/lib/textMarks'
import { useEffect, useRef, useState } from 'react'

type RichTextFieldProps = {
  value: string
  onChange: (html: string) => void
  mode: 'small' | 'large'
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

export function RichTextField({ value, onChange, mode }: RichTextFieldProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [italicOn, setItalicOn] = useState(false)
  const [boldOn, setBoldOn] = useState(false)
  const [h3On, setH3On] = useState(false)

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
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
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
      <p className="mt-1.5 text-[11px] leading-relaxed text-ink-muted">
        {mode === 'large'
          ? 'Select words, then Italic. Click Italic again to undo.'
          : 'Select words, then Bold or H3. Click the same button again to undo.'}
      </p>
    </div>
  )
}
