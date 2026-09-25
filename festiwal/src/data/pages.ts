import type { Lang } from '@/data/site'

export type SubpageId = 'o-festiwalu' | 'sklep' | 'wolontariusze' | 'faq'

/** Kolory jednolitych podstron: tło i tekst (tytuł, kreski, treść). */
export const SUBPAGE_COLORS: Record<SubpageId, { background: string; text: string }> = {
  'o-festiwalu': { background: 'var(--color-primary)', text: 'var(--color-ground)' },
  sklep: { background: '#98B5FC', text: '#2C1D12' },
  wolontariusze: { background: '#453B33', text: '#D3D3D3' },
  faq: { background: '#2E202C', text: '#EFE6D9' },
}

export type Text = Record<Lang, string>

/**
 * Klocki treści. Sekcje są oddzielone kreską, klocki w sekcji stoją jeden pod drugim.
 * Kolejność i liczbę sekcji/klocków można dowolnie zmieniać.
 * W akapitach działa link w formacie `[tekst](https://adres)`.
 */
export type Block =
  | { type: 'heading'; text: Text }
  | { type: 'text'; paragraphs: Record<Lang, string[]> }
  /**
   * Wpinka (iframe), np. widget sprzedaży Going. `height` w rem.
   * Pusty `src` pokazuje przycisk do strony biletów.
   */
  | { type: 'embed'; src: string; height: number; title: Text }
  /** Rozwijane pytania: otwarte jest zawsze najwyżej jedno. */
  | { type: 'faq'; items: { question: Text; answer: Record<Lang, string[]> }[] }
  | { type: 'statement'; text: Text }
  /** `width` to szerokość elipsy w rem (1 rem = 10 px przy 1728 px), wysokość jest wspólna. */
  | { type: 'photos'; photos: { src: string; width: number; alt: Text }[] }
  /** Pusty `href` wyświetla sam tekst bez linku. */
  | { type: 'links'; links: { label: Text; href: string }[] }

export type Section = Block[]

export const ABOUT_SECTIONS: Section[] = [
  [
    { type: 'heading', text: { pl: 'Czym są STREFY?', en: 'What is STREFY?' } },
    {
      type: 'text',
      paragraphs: {
        pl: [
          'STREFY CZASOWE powstały w 2025 jako alternatywa dla tradycyjnych festiwali.',
          'Z wyróżnieniem ukończyła interdyscyplinarny kierunek Graphic Arts na University of the West of England w Bristolu. W latach 2019 – 2025 była związana z gdyńskim Stowarzyszeniem Traffic Design. Obecnie pracuje i tworzy niezależnie, projektuje grafikę do wystaw i wydarzeń dla instytucji kultury.',
        ],
        en: [
          'STREFY CZASOWE was founded in 2025 as an alternative to traditional festivals.',
          'She graduated with distinction in the interdisciplinary Graphic Arts programme at the University of the West of England in Bristol. From 2019 to 2025 she was part of the Traffic Design Association in Gdynia. She now works independently, designing graphics for exhibitions and events for cultural institutions.',
        ],
      },
    },
  ],
  [
    {
      type: 'photos',
      photos: [
        {
          src: 'festiwal_foto/about1.jpg',
          width: 46.82,
          alt: { pl: 'Poprzednia edycja festiwalu', en: 'Previous edition of the festival' },
        },
        {
          src: 'festiwal_foto/about2.jpg',
          width: 37.65,
          alt: { pl: 'Poprzednia edycja festiwalu', en: 'Previous edition of the festival' },
        },
        {
          src: 'festiwal_foto/about3.jpg',
          width: 15.46,
          alt: { pl: 'Poprzednia edycja festiwalu', en: 'Previous edition of the festival' },
        },
      ],
    },
  ],
  [
    {
      type: 'statement',
      text: {
        pl: 'ZANURZ SIĘ, PRZEŻYJ, TRANSFORMUJ, POCZUJ, PRZETRANSPORTUJ SIĘ',
        en: 'IMMERSE YOURSELF, EXPERIENCE, TRANSFORM, FEEL, BE TRANSPORTED',
      },
    },
  ],
  [
    {
      type: 'text',
      paragraphs: {
        pl: [
          'Projektantka grafiki, artystka wizualna, kuratorka festiwalu Strefy Czasowe. Głównymi obszarami jej zainteresowań są sztuka publiczna, detal architektoniczny, kształtowanie krajobrazu oraz identyfikacja wizualna miejsc. W Strefach wykorzystuje tę perspektywę, kładąc nacisk na lokalność i rolę przestrzeni w budowaniu narracji wydarzenia.',
        ],
        en: [
          'Graphic designer, visual artist and curator of the Strefy Czasowe festival. Her main interests are public art, architectural detail, landscape design and the visual identity of places. At Strefy she brings this perspective, focusing on locality and the role of space in shaping the narrative of the event.',
        ],
      },
    },
  ],
  [
    { type: 'heading', text: { pl: 'Piszą o nas', en: 'Press' } },
    {
      type: 'links',
      links: [
        { label: { pl: 'Artykuł 1', en: 'Article 1' }, href: '' },
        { label: { pl: 'Artykuł 2', en: 'Article 2' }, href: '' },
        { label: { pl: 'Artykuł 3', en: 'Article 3' }, href: '' },
      ],
    },
  ],

]

export const SHOP_SECTIONS: Section[] = [
  [
    {
      type: 'text',
      paragraphs: {
        pl: ['Tekst o biletach i sklepie festiwalowym — do uzupełnienia.'],
        en: ['Text about tickets and the festival shop — to be added.'],
      },
    },
  ],
  [
    {
      type: 'embed',
      src: '',
      height: 80,
      title: { pl: 'Sprzedaż biletów Going', en: 'Going ticket sales' },
    },
  ],
  [
    {
      type: 'text',
      paragraphs: {
        pl: ['Dalsza część tekstu — do uzupełnienia.'],
        en: ['More text — to be added.'],
      },
    },
  ],
]

export const VOLUNTEERS_SECTIONS: Section[] = [
  [
    {
      type: 'text',
      paragraphs: {
        pl: ['STREFY CZASOWE tworzymy razem. Zależy nam na przestrzeni do wspólnego przeżywania sztuki — otwartej i uważnej. Szukamy osób, które chcą współtworzyć z nami najbliższą edycję festiwalu.\n\nChcesz dołączyć do zespołu produkcyjnego?\n\nSkontaktuj się z nami lub wypełnij [formularz](https://docs.google.com/forms/d/e/1FAIpQLSe-zYxx5DaCgpR-jVlfGddWpz84_0pOWB_R1X5fzcSQqGLPmw/viewform)'],
        en: ['STREFY CZASOWE are created together. We value the space for shared experience of art — open and attentive. We are looking for people who want to collaborate with us to create the next edition of the festival.\nDo you want to join the production team?\nContact us or fill out the [form](https://docs.google.com/forms/d/e/1FAIpQLSe-zYxx5DaCgpR-jVlfGddWpz84_0pOWB_R1X5fzcSQqGLPmw/viewform)'],
      },
    },
  ],
]
