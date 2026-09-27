import { useState } from 'react'

type Props = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
}

/** Zdjęcie pojawia się dopiero po pełnym załadowaniu i zdekodowaniu. */
export function FadeImg({ src, alt, fit = 'cover' }: Props) {
  const [shown, setShown] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onLoad={(event) => {
        void event.currentTarget.decode?.().catch(() => {})
        setShown(true)
      }}
      className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
        fit === 'contain' ? 'object-contain' : 'object-cover'
      } ${shown ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
