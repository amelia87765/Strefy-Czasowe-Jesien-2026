import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type VideoPeekProps = {
  caption: string
  onOpenChange?: (open: boolean) => void
}

type Box = { top: number; left: number; width: number; height: number }

const FULL: Box = { top: 4, left: 4, width: 92, height: 92 }
const EXPAND_MS = 720
/** Mnożnik głośności odtwarzacza (0–1). Końcowa głośność = to × głośność systemu. */
const FULL_VOLUME = 0.28

type Connection = { saveData?: boolean; effectiveType?: string }

function heavyMediaAllowed() {
  const link = (navigator as Navigator & { connection?: Connection }).connection
  if (!link) return true
  if (link.saveData) return false
  return link.effectiveType === undefined || link.effectiveType.includes('4g')
}

export function VideoPeek({ caption, onOpenChange }: VideoPeekProps) {
  const thumbRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<HTMLVideoElement>(null)
  const fullRef = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [locked, setLocked] = useState(false)
  const [from, setFrom] = useState<Box | null>(null)
  const [loopArmed, setLoopArmed] = useState(false)
  const [loopReady, setLoopReady] = useState(false)
  const [fullArmed, setFullArmed] = useState(false)
  const [fullReady, setFullReady] = useState(false)
  const [broken, setBroken] = useState(false)
  const startAt = useRef(0)
  const onOpenChangeRef = useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  const base = import.meta.env.BASE_URL
  const loopSrc = `${base}festiwal_foto/poprzednia-loop.mp4`
  const fullSrc = `${base}festiwal_foto/poprzednia.mp4`

  useEffect(() => {
    if (!heavyMediaAllowed()) return
    const idle = window.requestIdleCallback
    if (!idle) {
      const timer = window.setTimeout(() => setLoopArmed(true), 2000)
      return () => window.clearTimeout(timer)
    }
    const handle = idle(() => setLoopArmed(true), { timeout: 4000 })
    return () => window.cancelIdleCallback(handle)
  }, [])

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

  const box = open && from ? (expanded ? FULL : from) : null

  const syncStart = (video: HTMLVideoElement) => {
    if (startAt.current > 0 && startAt.current < video.duration) {
      video.currentTime = startAt.current
    }
  }

  const playWithSound = (video: HTMLVideoElement) => {
    video.volume = FULL_VOLUME
    video.muted = false
    const attempt = video.play()
    if (attempt) {
      void attempt.catch(() => {
        video.muted = true
        void video.play()
      })
    }
  }

  return (
    <div className="flex max-w-[44rem] items-start gap-[1.6rem]">
      <div
        ref={thumbRef}
        className="relative h-[9.18rem] w-[14.2rem] shrink-0 cursor-pointer overflow-hidden rounded-[1.7rem] bg-[#3E2D14]"
        onMouseEnter={() => {
          if (locked || open) return
          const rect = thumbRef.current?.getBoundingClientRect()
          if (!rect) return
          startAt.current = loopRef.current?.currentTime ?? 0
          const vw = window.innerWidth
          const vh = window.innerHeight
          setFrom({
            top: (rect.top / vh) * 100,
            left: (rect.left / vw) * 100,
            width: (rect.width / vw) * 100,
            height: (rect.height / vh) * 100,
          })
          setFullArmed(true)
          setOpen(true)
          onOpenChangeRef.current?.(true)
        }}
      >
        {loopArmed && !broken ? (
          <video
            ref={loopRef}
            src={loopSrc}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            onCanPlayThrough={() => setLoopReady(true)}
            onError={() => setBroken(true)}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              loopReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}
      </div>
      <p className="font-classico whitespace-pre-line text-[2.4rem] leading-none text-warm-taupe">
        {caption}
      </p>
      {open && box
        ? createPortal(
            <div
              className="fixed z-[400] overflow-hidden bg-[#3E2D14] shadow-[0_2.4rem_8rem_rgba(0,0,0,0.45)]"
              onPointerDown={() => {
                const video = fullRef.current
                if (video?.muted) playWithSound(video)
              }}
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
              {loopArmed && !broken ? (
                <video
                  src={loopSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  preload="auto"
                  onLoadedMetadata={(event) => syncStart(event.currentTarget)}
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    fullReady ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              ) : null}
              {fullArmed && !broken ? (
                <video
                  ref={fullRef}
                  src={fullSrc}
                  autoPlay
                  loop
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  preload="auto"
                  onLoadedMetadata={(event) => syncStart(event.currentTarget)}
                  onCanPlayThrough={(event) => {
                    setFullReady(true)
                    playWithSound(event.currentTarget)
                  }}
                  onError={() => setBroken(true)}
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    fullReady ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ) : null}
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
