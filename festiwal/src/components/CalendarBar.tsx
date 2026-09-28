import { LINKS, MONTHS, type Lang } from '@/data/site'
import { rotatedMonthIndex } from '@/lib/dst'

const EDITION = new Set(['paz', 'kwi'])

export function CalendarBar({ lang }: { lang: Lang }) {
  const start = rotatedMonthIndex()
  const months = [...MONTHS.slice(start), ...MONTHS.slice(0, start)]

  return (
    <div className="pointer-events-none sticky bottom-0 z-40 h-[10.5rem] overflow-visible px-[4.2rem] pb-[1.6rem] max-md:h-[calc(72*var(--m))] max-md:px-[calc(14*var(--m))] max-md:pb-[calc(8*var(--m))]">
      <div className="relative flex h-full items-end justify-between overflow-visible">
        {months.map((month, index) => {
          const named = index === 0 || index === months.length - 1 || EDITION.has(month.id)
          return (
            <span
              key={month.id}
              className="relative flex min-w-0 flex-1 flex-col items-center justify-end gap-[calc(4*var(--m))] overflow-visible md:block md:gap-0"
            >
              {month.id === 'paz' ? (
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="pointer-events-auto overflow-visible md:absolute md:bottom-[5.4rem] md:translate-x-[7.2rem]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}svg/Logo_Zima.svg`}
                    alt=""
                    className="calendar-edition-logo h-[4.65rem] w-auto drop-shadow"
                  />
                </a>
              ) : null}
              {month.id === 'kwi' ? (
                <img
                  src={`${import.meta.env.BASE_URL}svg/Logo_Lato.svg`}
                  alt=""
                  className="calendar-edition-logo pointer-events-none h-[4.65rem] w-auto drop-shadow md:absolute md:bottom-[5.4rem] md:-translate-x-[4rem]"
                />
              ) : null}
              <span className="font-classico text-[4.18rem] leading-none text-[#EFE6D9] max-md:hidden">
                {month[lang]}
              </span>
              <span className="hidden font-classico text-[calc(14*var(--m))] leading-none text-[#EFE6D9] max-md:block">
                {named ? month[lang] : '•'}
              </span>
            </span>
          )
        })}
      </div>
    </div>
  )
}
