import { MONTHS, type Lang } from '@/data/site'
import { rotatedMonthIndex } from '@/lib/dst'

export function CalendarBar({ lang, lift }: { lang: Lang; lift: number }) {
  const start = rotatedMonthIndex()
  const months = [...MONTHS.slice(start), ...MONTHS.slice(0, start)]

  return (
    <div
      className="pointer-events-none fixed z-40 px-[4.2rem] pb-[1.6rem]"
      style={{
        bottom: `${lift}px`,
        left: 'var(--gutter)',
        right: 'var(--gutter)',
        height: '10.5rem',
      }}
    >
      <div className="relative flex h-full items-end justify-between">
        {months.map((month) => (
          <span key={month.id} className="relative flex flex-col items-center">
            {month.id === 'paz' ? (
              <img
                src={`${import.meta.env.BASE_URL}svg/Logo_Zima.svg`}
                alt=""
                className="pointer-events-none absolute bottom-[5.4rem] h-[4.65rem] w-auto drop-shadow"
                style={{ transform: 'translateX(7.2rem)' }}
              />
            ) : null}
            {month.id === 'kwi' ? (
              <img
                src={`${import.meta.env.BASE_URL}svg/Logo_Lato.svg`}
                alt=""
                className="pointer-events-none absolute bottom-[5.4rem] h-[4.65rem] w-auto drop-shadow"
                style={{ transform: 'translateX(-4rem)' }}
              />
            ) : null}
            <span className="font-classico text-[4.18rem] leading-none text-[#EFE6D9]">
              {month[lang]}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
