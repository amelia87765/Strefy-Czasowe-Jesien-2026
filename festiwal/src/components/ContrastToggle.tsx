import type { Lang } from '@/data/site'
import { isHighContrast, setHighContrast } from '@/lib/contrast'
import { useState } from 'react'

const LABEL = { pl: 'Wysoki kontrast', en: 'High contrast' }

/** Prawy górny róg podstron, na wysokości napisu „STREFY CZASOWE”. */
export const CORNER_TOGGLE =
  'absolute top-[4.84rem] right-[calc(var(--gutter)+4.1rem)] z-50 h-[6.4rem] w-[6.4rem] rounded-[1.17rem] bg-transparent text-current aria-pressed:bg-[color-mix(in_srgb,currentColor_18%,transparent)] max-md:top-[calc(8*var(--m))] max-md:right-[calc(12*var(--m))] max-md:h-[calc(32*var(--m))] max-md:w-[calc(32*var(--m))] max-md:rounded-[calc(8*var(--m))]'

export function ContrastToggle({ lang, className }: { lang: Lang; className: string }) {
  const [on, setOn] = useState(isHighContrast)

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={LABEL[lang]}
      title={LABEL[lang]}
      onClick={() => {
        setHighContrast(!on)
        setOn(!on)
      }}
      className={`contrast-outline flex cursor-pointer items-center justify-center border-0 p-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-[62%] w-[62%]" fill="currentColor">
        <path d="M16.56 8.94 7.62 0 6.21 1.41l2.38 2.38-5.15 5.15a1.49 1.49 0 0 0 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10 10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5a2 2 0 0 0 4 0c0-1.33-2-3.5-2-3.5z" />
        <path d="M0 20h24v4H0z" />
      </svg>
    </button>
  )
}
