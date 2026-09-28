import { SUBPAGE_COLORS, type SubpageId } from '@/data/pages'
import { TEXT_MENU, type Lang } from '@/data/site'
import { readLang } from '@/lib/lang'
import { useFitText } from '@/lib/useFitText'
import { useFontsReady } from '@/lib/useFontsReady'
import { useEffect, useState, type ReactNode } from 'react'

type Props = {
  id: SubpageId
  children?: (lang: Lang) => ReactNode
}

export function SubPage({ id, children }: Props) {
  const ready = useFontsReady()
  const [lang] = useState(readLang)
  const { background, text } = SUBPAGE_COLORS[id]
  const title = TEXT_MENU.find((item) => item.id === id)?.label[lang] ?? ''
  const titleRef = useFitText<HTMLHeadingElement>(0.5, title)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${title} — STREFY CZASOWE`
    document.documentElement.style.background = background
    document.body.style.background = background
  }, [lang, title, background])

  return (
    <div className="relative min-h-svh overflow-x-clip" style={{ background, color: text }}>
      <a
        href={import.meta.env.BASE_URL}
        className="absolute top-[4.84rem] left-[calc(var(--gutter)+4.1rem)] z-50 font-classico text-[calc(8.2rem*var(--type))] leading-[0.9] transition-opacity duration-500 max-md:top-[calc(16*var(--m))] max-md:left-[calc(16*var(--m))] max-md:text-[calc(18*var(--m))]"
        style={{ opacity: ready ? 1 : 0 }}
      >
        STREFY CZASOWE
      </a>

      <main
        className={`page-frame relative pt-[15.32rem] pb-[20rem] transition-[filter] duration-700 max-md:pt-[calc(56*var(--m))] ${
          ready ? 'blur-none' : 'blur-2xl'
        }`}
      >
        <div className="mr-[5.3rem] ml-[25.6rem] max-md:mx-[calc(16*var(--m))]">
          <h1
            ref={titleRef}
            className="w-full overflow-hidden pt-[0.1em] font-classico text-[calc(14.3rem*var(--type))] leading-[1.05] whitespace-nowrap"
          >
            {title}
          </h1>
          <div className="mt-[1.6rem] h-[0.22rem] bg-current" />
        </div>
        {children ? (
          <div className="ml-[25.9rem] w-[131.9rem] max-w-[calc(100%-31.2rem)] max-md:ml-[calc(16*var(--m))] max-md:w-auto max-md:max-w-none max-md:pr-[calc(16*var(--m))]">
            {children(lang)}
          </div>
        ) : null}
      </main>
    </div>
  )
}
