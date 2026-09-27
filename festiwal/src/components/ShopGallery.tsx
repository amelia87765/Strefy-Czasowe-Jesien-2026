import { ShapePhoto } from '@/components/ArtistPhoto'
import { ProductCard } from '@/components/ProductCard'
import type { GalleryItem } from '@/data/pages'
import type { Lang } from '@/data/site'
import { fixOrphans } from '@/lib/typography'
import { useEffect, useRef, useState, type PointerEvent } from 'react'

const HOVER_INTENT_MS = 220
const REOPEN_COOLDOWN_MS = 450

export function ShopGallery({ items, lang }: { items: GalleryItem[]; lang: Lang }) {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const intentRef = useRef(0)
  const closedAtRef = useRef(0)

  useEffect(() => () => window.clearTimeout(intentRef.current), [])

  const cancelIntent = () => window.clearTimeout(intentRef.current)
  const openSoon = (item: GalleryItem) => {
    cancelIntent()
    if (performance.now() - closedAtRef.current < REOPEN_COOLDOWN_MS) return
    intentRef.current = window.setTimeout(() => setActive(item), HOVER_INTENT_MS)
  }
  const close = () => {
    closedAtRef.current = performance.now()
    setActive(null)
  }
  const trigger = (item: GalleryItem) => ({
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === 'mouse') openSoon(item)
    },
    onPointerLeave: cancelIntent,
    onClick: () => {
      cancelIntent()
      setActive(item)
    },
  })

  return (
    <>
      <ul className="ml-[-21.8rem] grid w-[calc(100vw-2*var(--gutter)-8.2rem)] grid-cols-[1fr_1.585fr_1fr] gap-x-[8.95rem] gap-y-[8.9rem]">
        {items.map((item) => {
          const socks = item.id === 'skarpety'
          return (
            <li key={item.id} className="flex flex-col items-center">
              <div className="relative w-full">
                <ShapePhoto
                  src={item.photo}
                  alt={item.caption[lang]}
                  mask="rounded"
                  className={`h-auto w-full ${socks ? 'aspect-[1600/1414]' : 'aspect-[50/70]'}`}
                  radius="4.44rem"
                  fit={socks ? 'cover' : 'contain'}
                />
                <div className="absolute inset-x-[20%] inset-y-[14%] cursor-pointer" {...trigger(item)} />
              </div>
              <p
                className="mt-[3.8rem] flex h-[10.51rem] w-full cursor-pointer items-center justify-center rounded-[4.44rem] px-[2.4rem] text-center font-classico text-[calc(4.32rem*var(--type))] leading-[0.9]"
                style={{ background: item.background, color: item.text }}
                {...trigger(item)}
              >
                {fixOrphans(item.caption[lang])}
              </p>
            </li>
          )
        })}
      </ul>
      <ProductCard item={active} lang={lang} onClose={close} />
    </>
  )
}
