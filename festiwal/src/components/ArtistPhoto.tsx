import { FadeImg } from '@/components/FadeImg'
import type { Artist, ArtistMask } from '@/data/artists'
import type { CSSProperties } from 'react'

function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

function shapeStyle(mask: ArtistMask, radius: string): CSSProperties {
  if (mask === 'rounded') return { borderRadius: radius }
  const url = `url("${asset(`svg/masks/${mask}.svg`)}")`
  return {
    maskImage: url,
    WebkitMaskImage: url,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
  }
}

type ShapeProps = {
  src: string
  alt: string
  mask: ArtistMask
  className: string
  radius: string
  fit?: 'cover' | 'contain'
}

export function ShapePhoto({ src, alt, mask, className, radius, fit }: ShapeProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-[#46351C] ${className}`}
      style={shapeStyle(mask, radius)}
    >
      <FadeImg src={asset(src)} alt={alt} fit={fit} />
    </div>
  )
}

type Props = {
  artist: Artist
  className: string
  radius: string
}

export function ArtistPhoto({ artist, className, radius }: Props) {
  return (
    <ShapePhoto
      src={artist.photo}
      alt={artist.name}
      mask={artist.mask}
      className={className}
      radius={radius}
    />
  )
}
