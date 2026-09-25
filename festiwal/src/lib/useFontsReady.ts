import { useEffect, useState } from 'react'

export function useFontsReady(fallbackMs = 1200) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const done = () => setReady(true)
    void document.fonts.ready.then(done)
    const fallback = window.setTimeout(done, fallbackMs)
    return () => window.clearTimeout(fallback)
  }, [fallbackMs])

  return ready
}
