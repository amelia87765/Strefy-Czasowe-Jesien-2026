import type { Lang } from '@/data/site'

/**
 * Pliki z `public/svg/masks/`. `rounded` to zaokrąglony prostokąt bez maski.
 * `announcement-*` to otwory z nakładek „Artist announcement” w social toolu
 * (`npm run masks -w festiwal` generuje je ponownie).
 */
export type ArtistMask =
  | 'rounded'
  | 'announcement-1'
  | 'announcement-2'
  | 'announcement-3'
  | 'announcement-4'
  | 'announcement-5'
  | 'announcement-6'
  | 'announcement-7'
  | 'union'
  | 'union-1'
  | 'union-2'
  | 'union-3'
  | 'double-blob'
  | 'dual-oval'
  | 'soft-circle'
  | 'triple-oval'
  | 'wave'

export type Artist = {
  id: string
  name: string
  role: Record<Lang, string>
  /** Ścieżka względem `public/`, np. `festiwal_foto/artysci/renia-maj.jpg`. */
  photo: string
  mask: ArtistMask
  /** Każdy element to osobny akapit. */
  description: Record<Lang, string[]>
  instagram: string
  /** Tło podpisu i planszy. */
  background: string
  /** Kolor tekstu podpisu i planszy. */
  text: string
}

export const artistsCopy: Record<Lang, { title: string; categories: string; pageTitle: string }> = {
  pl: {
    title: 'ARTYŚCI',
    categories: 'Kurator, Muzyka, Sztuki Wizualne, Węch, Dźwięk, Smak, Performance',
    pageTitle: 'ARTYŚCI — STREFY CZASOWE',
  },
  en: {
    title: 'ARTISTS',
    categories: 'Curator, Music, Visual Arts, Smell, Sound, Taste, Performance',
    pageTitle: 'ARTISTS — STREFY CZASOWE',
  },
}

const CURATOR = { pl: 'Kuratorka', en: 'Curator' }

const RENIA_BIO = {
  pl: [
    'Projektantka grafiki, artystka wizualna, kuratorka festiwalu Strefy Czasowe. Głównymi obszarami jej zainteresowań są sztuka publiczna, detal architektoniczny, kształtowanie krajobrazu oraz identyfikacja wizualna miejsc. W Strefach wykorzystuje tę perspektywę, kładąc nacisk na lokalność i rolę przestrzeni w budowaniu narracji wydarzenia.',
    'Z wyróżnieniem ukończyła interdyscyplinarny kierunek Graphic Arts na University of the West of England w Bristolu. W latach 2019 – 2025 była związana z gdyńskim Stowarzyszeniem Traffic Design. Obecnie pracuje i tworzy niezależnie, projektuje grafikę do wystaw i wydarzeń dla instytucji kultury.',
  ],
  en: [
    'Graphic designer, visual artist and curator of the Strefy Czasowe festival. Her main interests are public art, architectural detail, landscape design and the visual identity of places. At Strefy she brings this perspective, focusing on locality and the role of space in shaping the narrative of the event.',
    'She graduated with distinction in the interdisciplinary Graphic Arts programme at the University of the West of England in Bristol. From 2019 to 2025 she was part of the Traffic Design Association in Gdynia. She now works independently, designing graphics for exhibitions and events for cultural institutions.',
  ],
}

export const ARTISTS: Artist[] = [
  {
    id: 'renia-maj',
    name: 'Renia Maj',
    role: CURATOR,
    photo: 'festiwal_foto/artysci.jpg',
    mask: 'announcement-1',
    description: RENIA_BIO,
    instagram: 'https://www.instagram.com/strefyczasowe',
    background: '#17212F',
    text: '#5C7FFF',
  },
  {
    id: 'artysta-2',
    name: 'Renia Maj',
    role: CURATOR,
    photo: 'festiwal_foto/o-festiwalu.jpg',
    mask: 'announcement-2',
    description: RENIA_BIO,
    instagram: 'https://www.instagram.com/strefyczasowe',
    background: '#CCC12C',
    text: '#2C1D12',
  },
  {
    id: 'artysta-3',
    name: 'Renia Maj',
    role: CURATOR,
    photo: 'festiwal_foto/wolontariusze.jpg',
    mask: 'announcement-3',
    description: RENIA_BIO,
    instagram: 'https://www.instagram.com/strefyczasowe',
    background: '#EFE6D9',
    text: '#2C1D12',
  },
  {
    id: 'artysta-4',
    name: 'Renia Maj',
    role: CURATOR,
    photo: 'festiwal_foto/sklep.jpg',
    mask: 'announcement-4',
    description: RENIA_BIO,
    instagram: 'https://www.instagram.com/strefyczasowe',
    background: '#5C7FFF',
    text: '#2C1D12',
  },
  {
    id: 'artysta-5',
    name: 'Renia Maj',
    role: CURATOR,
    photo: 'festiwal_foto/faq.jpg',
    mask: 'announcement-5',
    description: RENIA_BIO,
    instagram: 'https://www.instagram.com/strefyczasowe',
    background: '#FF562C',
    text: '#2C1D12',
  },
  {
    id: 'artysta-6',
    name: 'Renia Maj',
    role: CURATOR,
    photo: 'festiwal_foto/artysci.jpg',
    mask: 'announcement-6',
    description: RENIA_BIO,
    instagram: 'https://www.instagram.com/strefyczasowe',
    background: '#17212F',
    text: '#5C7FFF',
  },
]
