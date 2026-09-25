import { useState } from 'react'

type Props = {
  src: string
  alt: string
}

/** Zdjęcie pojawia się dopiero po pełnym załadowaniu i zdekodowaniu. */
export function FadeImg({ src, alt }: Props) {
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
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
