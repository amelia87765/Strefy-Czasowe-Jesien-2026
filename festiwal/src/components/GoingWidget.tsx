import { TICKETS_URL, type Lang } from '@/data/site'
import { GOING, goingCopy } from '@/data/tickets'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    going?: (...commands: unknown[]) => void
    goingQ?: unknown[]
    goingSettings?: { gv: string }
    dataLayer?: unknown[]
  }
}

const FRAME_ID = 'going_frame'
let started = false

function fromGoing(origin: string) {
  try {
    return /(^|\.)goingapp\.pl$/.test(new URL(origin).hostname)
  } catch {
    return false
  }
}

export function GoingWidget({ lang }: { lang: Lang }) {
  const [loaded, setLoaded] = useState(() => window.location.href.includes('transactionId'))
  const t = goingCopy[lang]

  useEffect(() => {
    const inQueue = window.location.href.includes('queue=true')

    const onMessage = (event: MessageEvent) => {
      if (!fromGoing(event.origin)) return
      let data = event.data
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }
      if (!data || typeof data !== 'object') return
      setLoaded(true)
      if (data.type === 'GA_DATALAYER_PUSH') (window.dataLayer ??= []).push(data.payload)
      if (data.queue && !inQueue) {
        const url = new URL(window.location.href)
        url.searchParams.append('queue', 'true')
        window.location.assign(url.toString())
      }
    }
    window.addEventListener('message', onMessage)

    if (!started) {
      started = true
      window.going ??= (...commands: unknown[]) => {
        ;(window.goingQ ??= []).push(...commands)
      }
      window.goingSettings = { gv: GOING.version }
      const script = document.createElement('script')
      script.async = true
      script.src = `${GOING.script}?gv=${GOING.version}`
      document.head.appendChild(script)

      const domain = inQueue ? 'https://queue.goingapp.pl' : 'https://goingapp.pl'
      window.going(
        { type: 'SET_PARENT', payload: FRAME_ID },
        {
          type: 'SET_APP_URL',
          payload: `${domain}/pinRundate/${GOING.eventSlug}/${GOING.rundateSlug}/zakup`,
        },
        { type: 'GET_ERROR_FROM_URL', payload: 'error' },
        { type: 'SET_CURRENT_URL', payload: window.location.href },
        { type: 'GET_TRANSACTION_FROM_URL', payload: 'transactionId' },
        { type: 'SET_LANGUAGE', payload: lang },
        { type: 'GET_EVENT_SLUG_FROM_URL', payload: 'eSlug' },
        { type: 'GET_RUNDATE_SLUG_FROM_URL', payload: 'rSlug' },
        { type: 'GET_EVENT_ID_FROM_URL', payload: 'rid' },
      )
    }

    return () => window.removeEventListener('message', onMessage)
  }, [lang])

  return (
    <div className="flex flex-col gap-[2.4rem]">
      {loaded ? null : (
        <p className="font-classico text-[calc(3.6rem*var(--type))] leading-[0.9]">
          {t.loading}{' '}
          {t.fallback}{' '}
          <a
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-[0.18em] transition-opacity hover:opacity-70"
          >
            Going
          </a>
          .
        </p>
      )}
      <div id={FRAME_ID} className="w-full" />
    </div>
  )
}
