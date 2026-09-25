import { FadeImg } from '@/components/FadeImg'
import type { Artist } from '@/data/artists'
import type { CSSProperties } from 'react'

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function shapeStyle(artist: Artist, radius: string): CSSProperties {
  if (artist.mask === 'rounded') return { borderRadius: radius }
  const url = `url("${asset(`svg/masks/${artist.mask}.svg`)}")`
  return {
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  }
}

type Props = {
  artist: Artist
  className: string
  radius: string
}

export function ArtistPhoto({ artist, className, radius }: Props) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-[#46351C] ${className}`}
      style={shapeStyle(artist, radius)}
    >
      <FadeImg src={asset(artist.photo)} alt={artist.name} />
    </div>
  )
}
