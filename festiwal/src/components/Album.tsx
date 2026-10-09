import { FadeImg } from '@/components/FadeImg'
import type { AlbumPhoto } from '@/data/pages'
import type { Lang } from '@/data/site'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const FADE_MS = 260
const HOVER_INTENT_MS = 220
/** Po zamknięciu miniatura pod kursorem nie otwiera się od razu ponownie. */
const REOPEN_COOLDOWN_MS = 450
const SWIPE_PX = 50

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function photoSet(photo: AlbumPhoto) {
  const base = asset(photo.src)
  return `${base}-480.webp 480w, ${base}-960.webp 960w, ${base}-full.webp ${photo.width}w`
}

const COPY = {
  pl: { photo: 'Zdjęcie z festiwalu', close: 'Zamknij', prev: 'Poprzednie', next: 'Następne' },
  en: { photo: 'Festival photo', close: 'Close', prev: 'Previous', next: 'Next' },
}

export function Album({ photos, lang }: { photos: AlbumPhoto[]; lang: Lang }) {
  const [open, setOpen] = useState<number | null>(null)
  const intentRef = useRef(0)
  const closedAtRef = useRef(0)
  const blockedRef = useRef(false)
  const t = COPY[lang]

  useEffect(() => () => window.clearTimeout(intentRef.current), [])

  const openSoon = (index: number) => {
    window.clearTimeout(intentRef.current)
    if (blockedRef.current || performance.now() - closedAtRef.current < REOPEN_COOLDOWN_MS) return
    intentRef.current = window.setTimeout(() => setOpen(index), HOVER_INTENT_MS)
  }
  const change = (index: number | null) => {
    if (index === null) {
      window.clearTimeout(intentRef.current)
      closedAtRef.current = performance.now()
      blockedRef.current = true
    }
    setOpen(index)
  }

  return (
    <>
      <div
        className="grid grid-cols-4 gap-[2.4rem] max-md:grid-cols-2 max-md:gap-[calc(8*var(--m))]"
        onPointerMove={(event) => {
          if (event.target === event.currentTarget) blockedRef.current = false
        }}
      >
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`${t.photo} ${index + 1}`}
            onClick={() => change(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') openSoon(index)
            }}
            onPointerLeave={() => {
              window.clearTimeout(intentRef.current)
              blockedRef.current = false
            }}
            className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[2.4rem] border-0 bg-[color-mix(in_srgb,currentColor_12%,transparent)] p-0 max-md:rounded-[calc(14*var(--m))]"
          >
            <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
              <FadeImg
                src={`${asset(photo.src)}-480.webp`}
                srcSet={photoSet(photo)}
                sizes="(max-width: 767px) 46vw, 19vw"
                alt=""
              />
            </span>
          </button>
        ))}
      </div>
      <Lightbox photos={photos} index={open} lang={lang} onChange={change} />
    </>
  )
}

function Lightbox({
  photos,
  index,
  lang,
  onChange,
}: {
  photos: AlbumPhoto[]
  index: number | null
  lang: Lang
  onChange: (index: number | null) => void
}) {
  const [shown, setShown] = useState<number | null>(index)
  const [visible, setVisible] = useState(false)
  const touchX = useRef<number | null>(null)
  const changeRef = useRef(onChange)
  changeRef.current = onChange
  const t = COPY[lang]
  const count = photos.length
  const step = (delta: number) => {
    if (index !== null) onChange((index + delta + count) % count)
  }
  const stepRef = useRef(step)
  stepRef.current = step

  useEffect(() => {
    if (index !== null) {
      setShown(index)
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    setVisible(false)
    const timer = window.setTimeout(() => setShown(null), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [index])

  useEffect(() => {
    if (index === null) return
    for (const near of [index - 1, index + 1]) {
      const img = new Image()
      img.sizes = '90vw'
      img.srcset = photoSet(photos[(near + count) % count])
    }
  }, [index, photos, count])

  const isOpen = index !== null
  useEffect(() => {
    if (!isOpen) return
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') changeRef.current(null)
      if (event.key === 'ArrowLeft') stepRef.current(-1)
      if (event.key === 'ArrowRight') stepRef.current(1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  if (shown === null) return null
  const photo = photos[shown]
  const arrow =
    'absolute top-1/2 flex h-[6.4rem] w-[6.4rem] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-true-black/45 p-0 text-cream backdrop-blur-[1rem] transition-colors hover:bg-true-black/70 max-md:h-[calc(40*var(--m))] max-md:w-[calc(40*var(--m))]'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.photo} ${shown + 1} / ${count}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-true-black/88 backdrop-blur-[2rem]"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: `opacity ${FADE_MS}ms ease`,
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onChange(null)
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        const start = touchX.current
        const end = event.changedTouches[0]?.clientX
        touchX.current = null
        if (start === null || end === undefined) return
        if (end - start > SWIPE_PX) step(-1)
        else if (start - end > SWIPE_PX) step(1)
      }}
    >
      <div
        className="relative overflow-hidden rounded-[2.4rem] max-md:rounded-[calc(14*var(--m))]"
        style={{
          transform: `scale(${visible ? 1 : 0.92})`,
          transition: `transform ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <img
          key={photo.src}
          src={`${asset(photo.src)}-full.webp`}
          srcSet={photoSet(photo)}
          sizes="90vw"
          width={photo.width}
          height={photo.height}
          alt={`${t.photo} ${shown + 1}`}
          decoding="async"
          draggable={false}
          className="block h-auto max-h-[86svh] w-auto max-w-[86vw] select-none max-md:max-w-[92vw]"
        />
        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label={t.prev}
              className={`${arrow} left-[2rem] max-md:left-[calc(8*var(--m))]`}
              onClick={() => step(-1)}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              aria-label={t.next}
              className={`${arrow} right-[2rem] max-md:right-[calc(8*var(--m))]`}
              onClick={() => step(1)}
            >
              <Chevron direction="right" />
            </button>
          </>
        ) : null}
      </div>
      <button
        type="button"
        aria-label={t.close}
        onClick={() => onChange(null)}
        className="absolute top-[3.2rem] right-[3.2rem] flex h-[6.4rem] w-[6.4rem] cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-cream transition-opacity hover:opacity-70 max-md:top-[calc(12*var(--m))] max-md:right-[calc(12*var(--m))] max-md:h-[calc(40*var(--m))] max-md:w-[calc(40*var(--m))]"
      >
        <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" aria-hidden>
          <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>,
    document.body,
  )
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[45%] w-[45%]" aria-hidden>
      <path
        d={direction === 'left' ? 'M15 4l-8 8 8 8' : 'M9 4l8 8-8 8'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
