import { ArtistCard } from '@/components/ArtistCard'
import { ArtistPhoto } from '@/components/ArtistPhoto'
import { LineField } from '@/components/LineField'
import { ARTISTS, artistsCopy, type Artist } from '@/data/artists'
import { readLang } from '@/lib/lang'
import { useFitText } from '@/lib/useFitText'
import { useFontsReady } from '@/lib/useFontsReady'
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react'

const HOVER_INTENT_MS = 220

function PillName({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const tooWide = () => el.scrollWidth > el.clientWidth + 1
    const tooTall = () => {
      const slack = parseFloat(getComputedStyle(el).fontSize) * 0.2
      return el.scrollHeight > el.clientHeight + slack
    }
    const fit = () => {
      el.style.fontSize = ''
      const mobile = window.matchMedia('(max-width: 767px)').matches
      if (!tooWide() && (!mobile || !tooTall())) return
      const max = parseFloat(getComputedStyle(el).fontSize)
      let lo = max * 0.5
      let hi = max
      for (let step = 0; step < 12; step++) {
        const mid = (lo + hi) / 2
        el.style.fontSize = `${mid}px`
        if (tooWide() || (mobile && tooTall())) hi = mid
        else lo = mid
      }
      el.style.fontSize = `${lo}px`
    }
    fit()
    void document.fonts.ready.then(fit)
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [name])

  return (
    <span
      ref={ref}
      className="block w-full overflow-hidden px-[2.4rem] pt-[0.12em] font-classico text-[4.32rem] leading-[1.12] whitespace-nowrap max-md:max-h-[2.1em] max-md:px-[calc(8*var(--m))] max-md:pt-0 max-md:text-[calc(22*var(--m))] max-md:leading-[1] max-md:whitespace-normal"
    >
      {name}
    </span>
  )
}
/** Po zamknięciu karty kafelek pod kursorem nie otwiera się od razu ponownie. */
const REOPEN_COOLDOWN_MS = 450

export default function ArtistsPage() {
  const ready = useFontsReady()
  const [lang] = useState(readLang)
  const [active, setActive] = useState<Artist | null>(null)
  const intentRef = useRef(0)
  const closedAtRef = useRef(0)
  const t = artistsCopy[lang]
  const titleRef = useFitText<HTMLHeadingElement>(0.5, t.title)

  useEffect(() => () => window.clearTimeout(intentRef.current), [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.pageTitle
  }, [lang, t.pageTitle])

  const cancelIntent = () => window.clearTimeout(intentRef.current)
  const openSoon = (artist: Artist) => {
    cancelIntent()
    if (performance.now() - closedAtRef.current < REOPEN_COOLDOWN_MS) return
    intentRef.current = window.setTimeout(() => setActive(artist), HOVER_INTENT_MS)
  }
  const close = () => {
    closedAtRef.current = performance.now()
    setActive(null)
  }
  const trigger = (artist: Artist) => ({
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === 'mouse') openSoon(artist)
    },
    onPointerLeave: cancelIntent,
    onClick: () => {
      cancelIntent()
      setActive(artist)
    },
  })

  return (
    <div className="relative min-h-svh overflow-x-clip text-secondary">
      <div
        className="pointer-events-none absolute inset-0 min-h-svh"
        style={{
          background:
            'linear-gradient(180deg, var(--color-ground) 60.1%, var(--color-primary) 100%)',
        }}
      />
      <LineField />

      <a
        href={import.meta.env.BASE_URL}
        className="absolute top-[4.84rem] left-[calc(var(--gutter)+4.1rem)] z-50 font-classico text-[calc(8.2rem*var(--type))] leading-[0.9] text-secondary transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      >
        STREFY CZASOWE
      </a>

      <div
        className={`relative min-h-svh transition-[filter] duration-700 ${ready ? 'blur-none' : 'blur-2xl'}`}
      >
        <main className="page-frame relative z-10 pt-[17.36rem] pb-[36.5rem]">
          <div className="mx-auto w-[131.9rem] max-w-[calc(100%-4rem)]">
            <h1
              ref={titleRef}
              className="ml-[0.7rem] max-w-[calc(100%-0.7rem)] overflow-hidden pt-[0.1em] font-classico text-[calc(14.3rem*var(--type))] leading-[1.05] whitespace-nowrap"
            >
              {t.title}
            </h1>
            <div className="mt-[1.65rem] h-[0.2rem] bg-secondary" />
            <p className="mt-[3.6rem] font-classico text-[calc(5.63rem*var(--type))] leading-[0.9]">
              {t.categories}
            </p>

            <ul className="mt-[6rem] grid grid-cols-2 gap-x-[calc(16*var(--m))] gap-y-[calc(28*var(--m))] md:grid-cols-3 md:gap-x-[8.95rem] md:gap-y-[8.9rem]">
              {ARTISTS.map((artist) => (
                <li key={artist.id} className="flex w-full flex-col items-center">
                  <div className="relative w-full">
                    <ArtistPhoto
                      artist={artist}
                      className={
                        artist.mask === 'rounded'
                          ? 'h-[45.7rem] w-[40.6rem] max-md:aspect-[406/457] max-md:h-auto max-md:w-full'
                          : 'mt-[0.4rem] mb-[0.4rem] h-[44.9rem] w-[36.2rem] max-md:aspect-[362/449] max-md:h-auto max-md:w-full'
                      }
                      radius="4.44rem"
                    />
                    <div
                      className="absolute inset-x-[20%] inset-y-[14%] cursor-pointer"
                      {...trigger(artist)}
                    />
                  </div>
                  <div
                    className="mt-[3.8rem] flex h-[10.51rem] w-full cursor-pointer flex-col items-center justify-center gap-[0.6rem] rounded-[4.44rem] text-center max-md:mt-[calc(12*var(--m))] max-md:h-auto max-md:gap-[calc(4*var(--m))] max-md:overflow-hidden max-md:rounded-[calc(16*var(--m))] max-md:px-[calc(10*var(--m))] max-md:py-[calc(10*var(--m))]"
                    style={{ background: artist.background, color: artist.text }}
                    {...trigger(artist)}
                  >
                    <PillName name={artist.name} />
                    <span className="font-hanken text-[2.05rem] leading-[0.9] uppercase max-md:text-[calc(13*var(--m))]">
                      {artist.role[lang]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>

      <ArtistCard artist={active} lang={lang} onClose={close} />
    </div>
  )
}
