import { ShapePhoto } from '@/components/ArtistPhoto'
import type { GalleryItem } from '@/data/pages'
import type { Lang } from '@/data/site'
import { fixOrphans } from '@/lib/typography'
import { useFitText } from '@/lib/useFitText'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const FADE_MS = 240
const GRACE_MS = 400

type Props = {
  item: GalleryItem | null
  lang: Lang
  onClose: () => void
}

export function ProductCard({ item, lang, onClose }: Props) {
  const [current, setCurrent] = useState<GalleryItem | null>(item)
  const [visible, setVisible] = useState(false)
  const [fit, setFit] = useState(1)
  const backdropRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const enteredRef = useRef(false)
  const openedAtRef = useRef(0)
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  const fitKey = `${current?.id ?? ''}-${lang}`
  const nameRef = useFitText<HTMLHeadingElement>(0.5, fitKey)
  const descriptionRef = useFitText<HTMLDivElement>(0.55, fitKey)

  useEffect(() => {
    if (item) {
      setCurrent(item)
      enteredRef.current = false
      openedAtRef.current = performance.now()
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    setVisible(false)
    const timer = window.setTimeout(() => setCurrent(null), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [item])

  useLayoutEffect(() => {
    if (!current) return
    const measure = () => {
      const backdrop = backdropRef.current
      const card = cardRef.current
      if (!backdrop || !card) return
      const margin = parseFloat(getComputedStyle(document.documentElement).fontSize) * 3
      const band = parseFloat(getComputedStyle(backdrop).paddingTop)
      const room = backdrop.clientHeight - band - margin * 2
      setFit(Math.min(1, room / card.offsetHeight))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [current])

  useEffect(() => {
    if (!item) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current()
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || enteredRef.current) return
      const rect = cardRef.current?.getBoundingClientRect()
      if (!rect) return
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      if (inside) enteredRef.current = true
      else if (performance.now() - openedAtRef.current > GRACE_MS) closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointermove', onMove)
    }
  }, [item])

  if (!current) return null

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-40 box-border flex items-center justify-center pt-[12.17rem] backdrop-blur-[5rem]"
      style={{
        background: 'color-mix(in srgb, var(--color-secondary) 2%, transparent)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: `opacity ${FADE_MS}ms ease`,
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`product-${current.id}`}
        className="relative h-[48.55rem] w-[68.6rem] max-w-[calc(100vw-4rem)] shrink-0 rounded-[3.4rem]"
        style={{
          background: current.background,
          color: current.text,
          transform: `scale(${fit * (visible ? 1 : 0.97)})`,
          transition: `transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
        onPointerEnter={() => {
          enteredRef.current = true
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse' && enteredRef.current) onClose()
        }}
      >
        <div className="absolute top-[4.48rem] left-[3.62rem] flex w-[22.44rem] flex-col items-center text-center">
          <ShapePhoto
            src={current.photo}
            alt={current.caption[lang]}
            mask="rounded"
            className={`h-auto w-[22.44rem] ${
              current.id === 'skarpety' ? 'aspect-[1600/1414]' : 'aspect-[50/70]'
            }`}
            radius="2.75rem"
            fit={current.id === 'skarpety' ? 'cover' : 'contain'}
          />
          <h2
            ref={nameRef}
            id={`product-${current.id}`}
            className="mt-[2.7rem] max-h-[1.8em] w-full overflow-hidden font-classico text-[4.22rem] leading-[0.9]"
          >
            {current.caption[lang]}
          </h2>
        </div>

        <div
          ref={descriptionRef}
          className="absolute top-[3.25rem] right-[3.95rem] bottom-[3.6rem] left-[29.45rem] flex min-h-0 flex-col gap-[0.9em] overflow-hidden pt-[0.9em] font-classico text-[2.4rem] leading-[0.9]"
        >
          {current.description[lang].map((paragraph, index) => {
            const price = /^\d[\d\s]*(zł|pln)\.?$/i.test(paragraph.trim())
            const note = /najniższa cena|lowest price/i.test(paragraph)
            return (
              <p
                key={index}
                className={`whitespace-pre-line${
                  price ? ' text-[3.6rem]' : note ? ' mt-[-0.45em] text-[1.6rem]' : ''
                }`}
              >
                {fixOrphans(paragraph)}
              </p>
            )
          })}
        </div>
      </div>
    </div>,
    document.body,
  )
}
