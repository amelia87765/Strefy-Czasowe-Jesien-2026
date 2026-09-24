import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type VideoPeekProps = {
  caption: string
  onOpenChange?: (open: boolean) => void
}

type Box = { top: number; left: number; width: number; height: number }

const FULL: Box = { top: 4, left: 4, width: 92, height: 92 }
const EXPAND_MS = 720

export function VideoPeek({ caption, onOpenChange }: VideoPeekProps) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [locked, setLocked] = useState(false)
  const [from, setFrom] = useState<Box | null>(null)
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  const closeRef = useRef(() => {})
  closeRef.current = () => {
    if (!open || locked) return
    setExpanded(false)
    setLocked(true)
    window.setTimeout(() => {
      setOpen(false)
      setLocked(false)
      onOpenChangeRef.current?.(false)
    }, EXPAND_MS)
  }

  useEffect(() => {
    if (!open) return
    const frame = window.requestAnimationFrame(() => setExpanded(true))
    return () => window.cancelAnimationFrame(frame)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const src = `${import.meta.env.BASE_URL}festiwal_foto/poprzednia.mp4`
  const poster = `${import.meta.env.BASE_URL}festiwal_foto/poprzednia.jpg`

  const box = open && from ? (expanded ? FULL : from) : null

  return (
    <div className="flex max-w-[44rem] items-start gap-[1.6rem]">
      <div
        ref={thumbRef}
        className="relative h-[9.18rem] w-[14.2rem] shrink-0 cursor-pointer"
        onMouseEnter={() => {
          if (locked || open) return
          const rect = thumbRef.current?.getBoundingClientRect()
          if (!rect) return
          const vw = window.innerWidth
          const vh = window.innerHeight
          setFrom({
            top: (rect.top / vh) * 100,
            left: (rect.left / vw) * 100,
            width: (rect.width / vw) * 100,
            height: (rect.height / vh) * 100,
          })
          setOpen(true)
          onOpenChangeRef.current?.(true)
        }}
      >
        <Media
          src={src}
          poster={poster}
          className={`h-full w-full rounded-[1.7rem] object-cover ${open ? 'invisible' : ''}`}
        />
      </div>
      <p className="font-classico whitespace-pre-line text-[2.4rem] leading-none text-sand-muted">
        {caption}
      </p>
      {open && box
        ? createPortal(
            <div
              className="fixed z-[400] overflow-hidden shadow-[0_2.4rem_8rem_rgba(0,0,0,0.45)]"
              style={{
                top: `${box.top}vh`,
                left: `${box.left}vw`,
                width: `${box.width}vw`,
                height: `${box.height}vh`,
                borderRadius: expanded ? '2.8rem' : '1.7rem',
                transition: [
                  `top ${EXPAND_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `left ${EXPAND_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `width ${EXPAND_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `height ${EXPAND_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  `border-radius ${EXPAND_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                ].join(', '),
              }}
            >
              <Media src={src} poster={poster} className="h-full w-full object-cover" />
              {expanded ? (
                <button
                  type="button"
                  className="absolute top-[2rem] right-[2rem] z-[410] flex h-[4.8rem] w-[4.8rem] cursor-pointer items-center justify-center border-0 bg-transparent p-0 font-hanken text-[3.6rem] leading-none text-[#EFE6D9] drop-shadow-[0_0.2rem_1.2rem_rgba(0,0,0,0.65)]"
                  aria-label="Close"
                  onClick={() => closeRef.current()}
                >
                  ×
                </button>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

function Media({
  src,
  poster,
  className,
}: {
  src: string
  poster: string
  className: string
}) {
  const [useVideo, setUseVideo] = useState(true)
  if (!useVideo) {
    return <img src={poster} alt="" className={className} />
  }
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      onError={() => setUseVideo(false)}
    />
  )
}
