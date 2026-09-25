import type { Lang, ShapeItem } from '@/data/site'
import { useState } from 'react'

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function stretchMask(item: ShapeItem) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${item.viewBox}" preserveAspectRatio="none"><path fill="white" d="${item.path}"/></svg>`
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`
}

function Tile({
  item,
  lang,
  share,
  onEnter,
}: {
  item: ShapeItem
  lang: Lang
  share: number
  onEnter: () => void
}) {
  const [hover, setHover] = useState(false)
  const [shown, setShown] = useState(false)
  const mask = stretchMask(item)
  return (
    <a
      href={asset(item.href)}
      className="relative block h-full min-w-0 cursor-pointer overflow-hidden"
      style={{
        flex: `${share} 1 0`,
        transition: 'flex 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={() => {
        onEnter()
        setHover(true)
      }}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ background: item.inner }} />
        <img
          src={asset(item.photo)}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={(event) => {
            void event.currentTarget.decode?.().catch(() => {})
            setShown(true)
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            shown ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={item.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter
              id={`glow-${item.id}`}
              x="-25%"
              y="-25%"
              width="150%"
              height="150%"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodColor={item.inner} floodOpacity="1" result="tint" />
              <feComposite in="tint" in2="SourceAlpha" operator="out" result="outside" />
              <feGaussianBlur in="outside" stdDeviation="26" result="blurred" />
              <feComposite in="blurred" in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
          <path d={item.path} fill="#000" filter={`url(#glow-${item.id})`} />
        </svg>
      </div>
      {item.overlay ? (
        <img
          src={asset(item.overlay)}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{
            objectFit: 'fill',
            maskImage: mask,
            WebkitMaskImage: mask,
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      ) : null}
      <span
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[1.6rem] text-center font-classico text-[3.2rem] leading-none text-[#EFE6D9] uppercase drop-shadow-[0_0.2rem_1.2rem_rgba(0,0,0,0.55)] transition-opacity duration-300 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {item.label[lang]}
      </span>
    </a>
  )
}

function Row({
  items,
  lang,
  className,
}: {
  items: ShapeItem[]
  lang: Lang
  className: string
}) {
  const [active, setActive] = useState<string | null>(null)
  const total = items.reduce((sum, item) => sum + item.flex, 0)
  return (
    <div className={className} onMouseLeave={() => setActive(null)}>
      {items.map((item) => {
        const rest = items.filter((entry) => entry.id !== item.id)
        const restTotal = rest.reduce((sum, entry) => sum + entry.flex, 0)
        const hoveredRatio = items.length === 2 ? 0.64 : 0.5
        const share =
          active === null
            ? item.flex
            : active === item.id
              ? total * hoveredRatio
              : (item.flex / restTotal) * total * (1 - hoveredRatio)
        return (
          <Tile
            key={item.id}
            item={item}
            lang={lang}
            share={share}
            onEnter={() => setActive(item.id)}
          />
        )
      })}
    </div>
  )
}

export function ShapeMenu({
  row1,
  row2,
  lang,
}: {
  row1: ShapeItem[]
  row2: ShapeItem[]
  lang: Lang
}) {
  return (
    <div className="flex flex-col gap-[8.8rem] px-[6.55rem]">
      <Row items={row1} lang={lang} className="flex h-[81.8rem] gap-[2.4rem]" />
      <Row items={row2} lang={lang} className="flex h-[72.6rem] gap-[2.4rem]" />
    </div>
  )
}
