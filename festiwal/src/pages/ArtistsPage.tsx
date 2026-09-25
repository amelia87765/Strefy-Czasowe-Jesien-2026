import { ArtistCard } from '@/components/ArtistCard'
import { ArtistPhoto } from '@/components/ArtistPhoto'
import { LineField } from '@/components/LineField'
import { ARTISTS, artistsCopy, type Artist } from '@/data/artists'
import { readLang } from '@/lib/lang'
import { useFontsReady } from '@/lib/useFontsReady'
import { useEffect, useRef, useState, type PointerEvent } from 'react'

const HOVER_INTENT_MS = 220
/** Po zamknięciu karty kafelek pod kursorem nie otwiera się od razu ponownie. */
const REOPEN_COOLDOWN_MS = 450

export default function ArtistsPage() {
  const ready = useFontsReady()
  const [lang] = useState(readLang)
  const [active, setActive] = useState<Artist | null>(null)
  const intentRef = useRef(0)
  const closedAtRef = useRef(0)
  const t = artistsCopy[lang]

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
    <div className="relative min-h-svh overflow-x-clip bg-ground text-secondary">
      <a
        href={import.meta.env.BASE_URL}
        className="absolute top-[4.84rem] left-[calc(var(--gutter)+4.1rem)] z-50 font-classico text-[8.2rem] leading-[0.9] text-secondary transition-opacity duration-500"
        style={{ opacity: ready ? 1 : 0 }}
      >
        STREFY CZASOWE
      </a>

      <div
        className={`relative transition-[filter] duration-700 ${ready ? 'blur-none' : 'blur-2xl'}`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--color-ground) 60.1%, var(--color-primary) 100%)',
          }}
        />
        <LineField />

        <main className="page-frame relative z-10 pt-[17.36rem] pb-[36.5rem]">
          <div className="mx-auto w-[131.9rem] max-w-[calc(100%-4rem)]">
            <h1 className="ml-[0.7rem] font-classico text-[14.3rem] leading-[0.9]">
              {t.title}
            </h1>
            <div className="mt-[1.65rem] h-[0.2rem] bg-secondary" />
            <p className="mt-[3.6rem] font-classico text-[5.63rem] leading-[0.9]">
              {t.categories}
            </p>

            <ul className="mt-[6rem] grid grid-cols-3 gap-x-[8.95rem] gap-y-[8.9rem]">
              {ARTISTS.map((artist) => (
                <li key={artist.id} className="flex flex-col items-center">
                  <div className="relative">
                    <ArtistPhoto
                      artist={artist}
                      className={
                        artist.mask === 'rounded'
                          ? 'h-[45.7rem] w-[40.6rem]'
                          : 'mt-[0.4rem] mb-[0.4rem] h-[44.9rem] w-[36.2rem]'
                      }
                      radius="4.44rem"
                    />
                    <div
                      className="absolute inset-x-[20%] inset-y-[14%] cursor-pointer"
                      {...trigger(artist)}
                    />
                  </div>
                  <div
                    className="mt-[3.8rem] flex h-[10.51rem] w-full cursor-pointer flex-col items-center justify-center gap-[0.6rem] rounded-[4.44rem] text-center"
                    style={{ background: artist.background, color: artist.text }}
                    {...trigger(artist)}
                  >
                    <span className="font-classico text-[4.32rem] leading-none">
                      {artist.name}
                    </span>
                    <span className="font-hanken text-[2.05rem] leading-[0.9] uppercase">
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
