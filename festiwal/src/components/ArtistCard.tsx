import { ArtistPhoto } from '@/components/ArtistPhoto'
import type { Artist } from '@/data/artists'
import type { Lang } from '@/data/site'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const FADE_MS = 240
/** Kursor, który nie trafił na planszę przy otwarciu, zamyka ją dopiero po tym czasie. */
const GRACE_MS = 400

type Props = {
  artist: Artist | null
  lang: Lang
  onClose: () => void
}

export function ArtistCard({ artist, lang, onClose }: Props) {
  const [current, setCurrent] = useState<Artist | null>(artist)
  const [visible, setVisible] = useState(false)
  const [fit, setFit] = useState(1)
  const backdropRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const enteredRef = useRef(false)
  const openedAtRef = useRef(0)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (artist) {
      setCurrent(artist)
      enteredRef.current = false
      openedAtRef.current = performance.now()
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }
    setVisible(false)
    const timer = window.setTimeout(() => setCurrent(null), FADE_MS)
    return () => window.clearTimeout(timer)
  }, [artist])

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
    if (!artist) return
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
  }, [artist])

  if (!current) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-40 box-border flex pt-[12.17rem] items-center justify-center backdrop-blur-[5rem]"
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
        aria-labelledby={`artist-${current.id}`}
        className="relative h-[97.1rem] w-[137.2rem] max-w-[calc(100vw-4rem)] shrink-0 rounded-[6.8rem]"
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
        <div className="absolute top-[8.96rem] left-[7.24rem] flex w-[44.87rem] flex-col items-center text-center">
          <ArtistPhoto artist={current} className="h-[55.66rem] w-[44.87rem]" radius="5.5rem" />
          <h2
            id={`artist-${current.id}`}
            className="mt-[5.4rem] font-classico text-[8.45rem] leading-[0.9]"
          >
            {current.name}
          </h2>
          <p className="mt-[2.2rem] font-hanken text-[4rem] leading-[0.9] uppercase">
            {current.role[lang]}
          </p>
        </div>

        <div className="absolute top-[6.5rem] right-[7.9rem] bottom-[10.8rem] left-[58.89rem] flex flex-col">
          <div className="flex flex-col gap-[3.2rem] font-classico text-[3.6rem] leading-[0.9]">
            {current.description[lang].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <a
            href={current.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-[25.8rem] border-b border-current pb-[1.3rem] font-hanken text-[4rem] leading-[0.9] transition-opacity hover:opacity-70"
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </div>
  )
}
