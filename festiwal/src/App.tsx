import { LineField } from '@/components/LineField'
import { ShapeMenu } from '@/components/ShapeMenu'
import { VideoPeek } from '@/components/VideoPeek'
import { CalendarBar } from '@/components/CalendarBar'
import {
  LINKS,
  SHAPE_ROW_1,
  SHAPE_ROW_2,
  TEXT_MENU,
  TICKETS_URL,
  copy,
  type Lang,
} from '@/data/site'
import { nextClockChange, remainingParts } from '@/lib/dst'
import { readLang, saveLang } from '@/lib/lang'
import { useFitText } from '@/lib/useFitText'
import { useFontsReady } from '@/lib/useFontsReady'
import { Fragment, useEffect, useRef, useState } from 'react'

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

const SHRINK_MS = 900
const FADE_MS = 180
const TITLE_MS = SHRINK_MS + FADE_MS
const TITLE_SCALE = 3.15 / 23.4
const CROSS_AT = SHRINK_MS - FADE_MS
const DRIFT_REM = 26
const DRIFT_DELAY = SHRINK_MS * 0.3
const DRIFT_MS = SHRINK_MS * 0.7

const MENU_ITEM =
  'font-classico block w-full overflow-hidden border-b-2 border-primary py-[1.4rem] text-[7.54rem] leading-[1.05] text-primary whitespace-nowrap transition-colors duration-300 hover:text-secondary max-md:py-[calc(6*var(--m))] max-md:text-[calc(24*var(--m))]'

function FittedMenuLink({ href, label }: { href: string; label: string }) {
  const ref = useFitText<HTMLAnchorElement>(0.5, label)
  return (
    <a ref={ref} href={href} className={MENU_ITEM}>
      {label}
    </a>
  )
}

const M_TEXT = 'font-classico text-[calc(22.21*var(--m))] leading-[0.9]'
const M_LINK = `${M_TEXT} self-start border-0 border-b-[0.7px] border-solid border-current bg-transparent p-0 pb-[calc(1.5*var(--m))] text-left`

export default function App() {
  const [lang, setLang] = useState<Lang>(readLang)
  const ready = useFontsReady()
  const [compact, setCompact] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [emailShown, setEmailShown] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const compactRef = useRef(false)
  const busyRef = useRef(false)
  const t = copy[lang]
  const change = nextClockChange(now)
  const left = remainingParts(change.at, now)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = 'STREFY CZASOWE 2026 (-1)'
    saveLang(lang)
  }, [lang])

  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(tick)
  }, [])

  useEffect(() => {
    let timer = 0
    let frame = 0

    const drift = () =>
      DRIFT_REM * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 10)

    const glide = (to: number, delay: number) => {
      const from = window.scrollY
      if (Math.abs(to - from) < 1) return
      const startAt = performance.now() + delay
      window.cancelAnimationFrame(frame)
      const step = (stamp: number) => {
        const p = Math.min(1, Math.max(0, (stamp - startAt) / DRIFT_MS))
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
        window.scrollTo(0, from + (to - from) * eased)
        if (p < 1) frame = window.requestAnimationFrame(step)
      }
      frame = window.requestAnimationFrame(step)
    }

    const play = (toCompact: boolean) => {
      if (busyRef.current || compactRef.current === toCompact) return
      busyRef.current = true
      compactRef.current = toCompact
      setCompact(toCompact)
      glide(toCompact ? drift() : 0, toCompact ? DRIFT_DELAY : 0)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        busyRef.current = false
      }, TITLE_MS)
    }

    const nearTop = () => window.scrollY <= drift() + 2

    if (window.scrollY > 4) {
      compactRef.current = true
      setCompact(true)
    }

    const onWheel = (event: WheelEvent) => {
      if (busyRef.current) {
        event.preventDefault()
        return
      }
      if (!compactRef.current) {
        if (event.deltaY > 0) {
          event.preventDefault()
          play(true)
        }
        return
      }
      if (event.deltaY < 0 && nearTop()) {
        event.preventDefault()
        play(false)
      }
    }

    const onScroll = () => {
      if (busyRef.current) return
      if (!compactRef.current && window.scrollY > 4) play(true)
      else if (compactRef.current && window.scrollY <= 1) play(false)
    }

    let touchY = 0
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? touchY
      const delta = touchY - y
      touchY = y
      if (busyRef.current) {
        event.preventDefault()
        return
      }
      if (!compactRef.current) {
        event.preventDefault()
        if (delta > 10) play(true)
        return
      }
      if (delta < -10 && nearTop()) {
        event.preventDefault()
        play(false)
      }
    }

    const onKey = (event: KeyboardEvent) => {
      if (busyRef.current) {
        event.preventDefault()
        return
      }
      const down = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' '
      const up = event.key === 'ArrowUp' || event.key === 'PageUp'
      if (down && !compactRef.current) {
        event.preventDefault()
        play(true)
      } else if (up && compactRef.current && nearTop()) {
        event.preventDefault()
        play(false)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(timer)
      window.cancelAnimationFrame(frame)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div
      className={`relative min-h-svh overflow-x-clip bg-ground text-[#EFE6D9] transition-[filter] duration-700 ${
        ready ? 'blur-none' : 'blur-2xl'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--color-ground) 71.16%, var(--color-primary) 100%)',
        }}
      />
      <LineField />

      <img
        src={asset('svg/Logo.svg')}
        alt="Strefy Czasowe"
        className="fixed top-[6.3rem] left-[calc(var(--gutter)+6.55rem)] z-30 h-[5.6rem] w-auto max-md:top-[calc(14*var(--m))] max-md:h-[calc(24*var(--m))]"
        style={{
          opacity: compact ? 1 : 0,
          pointerEvents: compact ? 'auto' : 'none',
          transition: `opacity ${FADE_MS}ms linear ${compact ? CROSS_AT : 0}ms`,
        }}
      />

      <div className="page-frame relative z-10 pb-[11rem]">
        <header className="relative flex h-[48.5rem] justify-end px-[6.55rem] pt-[6.3rem] max-md:h-[calc(118*var(--m))] max-md:px-[calc(16*var(--m))] max-md:pt-[calc(14*var(--m))]">
          <div
            className="relative z-30 mt-[0.2rem] flex shrink-0 gap-[1rem] max-md:absolute max-md:top-[calc(108*var(--m))] max-md:right-[calc(16*var(--m))] max-md:z-40 max-md:mt-0 max-md:gap-[calc(6*var(--m))]"
            style={{
              opacity: videoOpen ? 0 : 1,
              pointerEvents: videoOpen ? 'none' : 'auto',
              transition: 'opacity 180ms ease',
            }}
          >
            <LangButton active={lang === 'en'} onClick={() => setLang('en')}>
              ENG
            </LangButton>
            <LangButton active={lang === 'pl'} onClick={() => setLang('pl')}>
              PL
            </LangButton>
          </div>
          <h1
            className="font-classico pointer-events-none fixed top-[6.3rem] left-[calc(var(--gutter)+6.55rem)] z-20 max-w-[113rem] origin-top-left text-[23.4rem] leading-[0.9] text-[#EFE6D9] will-change-transform max-md:top-[calc(14*var(--m))] max-md:left-[calc(16*var(--m))] max-md:max-w-[calc(100%-32px)] max-md:text-[calc(42*var(--m))]"
            style={{
              transform: compact ? `scale(${TITLE_SCALE})` : 'scale(1)',
              opacity: compact ? 0 : 1,
              transition: `transform ${SHRINK_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${FADE_MS}ms linear ${compact ? CROSS_AT : 0}ms`,
            }}
          >
            {t.title.split(' ').map((word, index) => (
              <span key={word}>
                {index > 0 ? ' ' : null}
                <span className="block">{word}</span>
              </span>
            ))}
          </h1>
        </header>

        <main className="relative z-10">
          <section className="mt-[2.4rem] flex items-start justify-between gap-[2rem] px-[6.55rem] max-md:px-[calc(16*var(--m))]">
            <p className="font-classico max-w-[44.5rem] text-[2.4rem] leading-[0.9] text-primary max-md:max-w-[calc(230*var(--m))] max-md:text-[calc(18*var(--m))] max-md:leading-[1.1]">
              {t.description}
              <em className="font-palladio italic">{t.descriptionEm}</em>
              {t.descriptionEnd}
            </p>
            <p className="font-classico max-w-[40.8rem] text-[2.4rem] leading-none text-warm-taupe max-md:hidden">
              {change.to === 'winter' ? t.winterLeft : t.summerLeft}
              {lang === 'en' ? <br /> : ' '}
              {left.days} {t.days} {left.hours}{' '}
              {t.hours} {left.seconds} {t.seconds}
            </p>
            <VideoPeek caption={t.previous} onOpenChange={setVideoOpen} className="max-md:hidden" />
          </section>

          <section className="mt-[1.6rem] flex flex-wrap items-center gap-[1.27rem] px-[6.55rem] max-md:mt-[calc(14*var(--m))] max-md:gap-[calc(8*var(--m))] max-md:px-[calc(16*var(--m))]">
            <a
              href={TICKETS_URL || undefined}
              target="_blank"
              rel="noreferrer noopener"
              className="font-hanken inline-flex h-[4.18rem] min-w-[9.14rem] items-center justify-center rounded-[1.17rem] bg-primary px-[1.22rem] text-[2.14rem] leading-none text-[#17212F] max-md:h-[calc(42*var(--m))] max-md:min-w-0 max-md:rounded-[calc(10*var(--m))] max-md:px-[calc(16*var(--m))] max-md:text-[calc(18*var(--m))]"
            >
              {t.tickets}
            </a>
            <div className="font-hanken inline-flex h-[4.18rem] min-w-0 items-center gap-[2.75rem] rounded-[1.17rem] bg-[#3E2D14] px-[1.22rem] text-[2.14rem] leading-none text-warm-taupe max-md:h-auto max-md:min-h-[calc(42*var(--m))] max-md:flex-wrap max-md:gap-[calc(8*var(--m))] max-md:rounded-[calc(10*var(--m))] max-md:px-[calc(16*var(--m))] max-md:py-[calc(10*var(--m))] max-md:text-[calc(18*var(--m))] max-md:text-cream">
              <span>{t.date}</span>
              <span>{t.venue}</span>
            </div>
          </section>

          <div className="mx-[6.55rem] mt-[2.4rem] border-t-2 border-[#EFE6D9] max-md:mx-[calc(16*var(--m))]" />

          <div className="mt-[12rem] max-md:mt-[calc(28*var(--m))]">
            <ShapeMenu row1={SHAPE_ROW_1} row2={SHAPE_ROW_2} lang={lang} />
          </div>

          <nav className="mt-[12rem] px-[5.3rem] max-md:mt-[calc(28*var(--m))] max-md:px-[calc(16*var(--m))]">
            {TEXT_MENU.map((item) => (
              <Fragment key={item.id}>
                <FittedMenuLink href={asset(item.href)} label={item.label[lang]} />
                {item.id === 'o-festiwalu' ? (
                  <VideoPeek
                    variant="menu"
                    caption={t.previousMenu}
                    onOpenChange={setVideoOpen}
                    className={`${MENU_ITEM} md:hidden`}
                  />
                ) : null}
              </Fragment>
            ))}
          </nav>

          <p className="font-classico mx-auto mt-[22rem] mb-[19.3rem] px-[6.55rem] text-center text-[4.8rem] leading-[0.9] text-primary max-md:mt-[calc(48*var(--m))] max-md:mb-[calc(36*var(--m))] max-md:px-[calc(16*var(--m))] max-md:text-[calc(24*var(--m))] max-md:leading-[1.1]">
            {t.followLead}
            <em className="font-palladio italic">{t.followLeadEm}</em>
            {t.followLeadEnd}
            <br />
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="whitespace-nowrap max-md:whitespace-normal"
            >
              {t.follow}
            </a>
          </p>

          <CalendarBar lang={lang} />

          <footer className="relative mx-[9.47rem] box-border hidden h-[84rem] w-[151.91rem] max-w-[calc(100%-18.94rem)] flex-col rounded-[7.1rem] bg-secondary px-[7.73rem] pt-[7.82rem] text-ground md:flex">
            <div className="flex items-start justify-between gap-[2rem]">
              <p className="font-classico text-[3.4rem] leading-[0.9]">{t.contact}</p>
              <div className="flex flex-wrap items-baseline gap-x-[3.6rem] gap-y-[1rem]">
                <span className="flex items-baseline gap-[1.6rem]">
                  {emailShown ? (
                    <span className="font-classico text-[3.4rem] leading-[0.9] select-all">
                      {LINKS.email}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    className="font-classico border-0 bg-transparent p-0 text-[3.4rem] leading-[0.9] text-[#2C1D12]"
                    onClick={() => setEmailShown(true)}
                  >
                    {t.email}
                  </button>
                </span>
                <a
                  className="font-classico text-[3.4rem] leading-[0.9]"
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.instagram}
                </a>
                <a
                  className="font-classico text-[3.4rem] leading-[0.9]"
                  href={LINKS.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.facebook}
                </a>
              </div>
            </div>
            <div className="relative mt-[4.15rem] border-t border-[#2C1D12] pt-[4.15rem]">
              <p className="font-classico text-[3.4rem] leading-[0.9]">{t.copyright}</p>
              <a
                href={asset(LINKS.terms)}
                target="_blank"
                rel="noreferrer noopener"
                className="absolute top-[4.15rem] right-0 font-classico text-[3.4rem] leading-[0.9]"
              >
                {t.terms}
              </a>
              <div className="mt-[3.2rem] flex items-start justify-between gap-[2.4rem]">
                <p className="font-classico shrink-0 text-[3.3rem] leading-none">
                  <span className="whitespace-nowrap">{t.orgTitle}</span>
                  <br />
                  <span className="whitespace-nowrap">
                    {t.orgName}{' '}
                    <a href={LINKS.smoothSail} target="_blank" rel="noreferrer noopener">
                      {t.orgHandle}
                    </a>
                  </span>
                </p>
                <p className="font-classico shrink-0 text-[3.3rem] leading-none">
                  <span className="whitespace-nowrap">{t.brandTitle}</span>
                  <br />
                  {t.brandName}
                </p>
                <p className="font-classico shrink-0 text-[3.3rem] leading-none">
                  <span className="whitespace-nowrap">{t.webTitle}</span>
                  <br />
                  {t.webName}
                </p>
              </div>
            </div>
            <img
              src={asset('svg/Logo_Big.svg')}
              alt=""
              className="mt-auto mb-[4.8rem] h-[42rem] w-[109.7rem] max-w-full self-center object-contain object-center"
            />
          </footer>

          <footer className="relative mx-[calc(24*var(--m))] mb-[calc(20*var(--m))] box-border flex min-h-[calc(560*var(--m))] flex-col rounded-[calc(39*var(--m))] bg-secondary px-[calc(32*var(--m))] pt-[calc(35*var(--m))] pb-[calc(28*var(--m))] text-ground md:hidden">
            <p className={`${M_TEXT} text-cream`}>{t.contact}</p>
            <div className="mt-[calc(12*var(--m))] flex flex-col items-start gap-[calc(10*var(--m))]">
              <span className="flex flex-col items-start gap-[calc(6*var(--m))]">
                {emailShown ? (
                  <span className={`${M_TEXT} select-all`}>{LINKS.email}</span>
                ) : null}
                <button type="button" className={M_LINK} onClick={() => setEmailShown(true)}>
                  {t.email}
                </button>
              </span>
              <a className={M_LINK} href={LINKS.instagram} target="_blank" rel="noreferrer">
                {t.instagram}
              </a>
              <a className={M_LINK} href={LINKS.facebook} target="_blank" rel="noreferrer">
                {t.facebook}
              </a>
            </div>

            <div className={`${M_TEXT} relative mt-[calc(40*var(--m))] text-periwinkle`}>
              <p>{t.copyright}</p>
              <a
                href={asset(LINKS.terms)}
                target="_blank"
                rel="noreferrer noopener"
                className="absolute top-0 right-0 border-0 border-b-[0.7px] border-solid border-current pb-[calc(1.5*var(--m))]"
              >
                {t.terms}
              </a>
              <p className="mt-[calc(12*var(--m))] text-[calc(21.35*var(--m))] leading-none">
                {t.orgTitle}
              </p>
              <p className="mt-[calc(6*var(--m))] text-[calc(21.35*var(--m))] leading-none">
                {t.orgName}{' '}
                <a href={LINKS.smoothSail} target="_blank" rel="noreferrer noopener">
                  {t.orgHandle}
                </a>
              </p>
              <div className="mt-[calc(8*var(--m))] mb-[calc(10*var(--m))] h-px w-[calc(105*var(--m))] bg-periwinkle" />
              <p className="text-[calc(21.35*var(--m))] leading-none">{t.brandTitle}</p>
              <p className="mt-[calc(6*var(--m))] text-[calc(21.35*var(--m))] leading-none">
                {t.brandName}
              </p>
              <div className="mt-[calc(8*var(--m))] mb-[calc(10*var(--m))] h-px w-[calc(129*var(--m))] bg-periwinkle" />
              <p className="text-[calc(21.35*var(--m))] leading-none">{t.webTitle}</p>
              <p className="mt-[calc(6*var(--m))] text-[calc(21.35*var(--m))] leading-none">
                {t.webName}
              </p>
            </div>

            <img
              src={asset('svg/Logo_Big.svg')}
              alt=""
              className="mt-auto h-[calc(108*var(--m))] w-[calc(283*var(--m))] max-w-full self-start object-contain object-left"
            />
          </footer>
        </main>
      </div>
    </div>
  )
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-hanken h-[4.18rem] min-w-[9.14rem] cursor-pointer rounded-[1.17rem] px-[1.2rem] text-[2.14rem] max-md:h-[calc(36*var(--m))] max-md:min-w-[calc(56*var(--m))] max-md:rounded-[calc(9*var(--m))] max-md:px-[calc(12*var(--m))] max-md:text-[calc(16*var(--m))] ${
        active ? 'bg-warm-taupe text-amber-espresso' : 'bg-amber-espresso text-warm-taupe'
      }`}
    >
      {children}
    </button>
  )
}
