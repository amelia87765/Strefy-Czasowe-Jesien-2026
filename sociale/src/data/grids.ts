import type { TextAlign, TextVAlign } from '@/data/brand'
import type { Rect } from '@/data/layout'

export type GridId =
  | 'central-mask'
  | 'top-copy-bottom-mask'
  | 'split-copy'
  | 'editorial'
  | 'full-mask'

export type GridMaskId =
  | 'triple-oval'
  | 'double-blob'
  | 'wave'
  | 'dual-oval'
  | 'soft-circle'
  | 'union-triple'
  | 'union-wave'
  | 'union-glow-warm'
  | 'union-glow-cool'

export type GridFitMode = 'contained' | 'background'

export type GridTextRole = 'headline' | 'body' | 'main'

export type NormRect = { x: number; y: number; width: number; height: number }

export type GridTextSlot = {
  id: GridTextRole
  region: NormRect
  wrap: 'title' | 'body'
  maxSize: number
  minSize: number
  lineHeight: number
}

export type GridTemplate = {
  id: GridId
  label: string
  fitMode: GridFitMode
  mask: NormRect
  texts: GridTextSlot[]
  defaultAlign: TextAlign
  defaultVAlign: TextVAlign
}

export type GridMask = {
  id: GridMaskId
  label: string
  file: string
  folder: 'grids' | 'elements'
  capacity: 'large' | 'medium' | 'small' | 'decorative'
}

export const gridMasks: GridMask[] = [
  { id: 'triple-oval', label: 'Triple oval', file: 'triple-oval.svg', folder: 'grids', capacity: 'large' },
  { id: 'double-blob', label: 'Double blob', file: 'double-blob.svg', folder: 'grids', capacity: 'large' },
  { id: 'wave', label: 'Wave', file: 'wave.svg', folder: 'grids', capacity: 'medium' },
  { id: 'dual-oval', label: 'Dual oval', file: 'dual-oval.svg', folder: 'grids', capacity: 'medium' },
  { id: 'soft-circle', label: 'Soft circle', file: 'soft-circle.svg', folder: 'grids', capacity: 'decorative' },
  { id: 'union-triple', label: 'Union triple', file: 'Union (1).svg', folder: 'elements', capacity: 'large' },
  { id: 'union-wave', label: 'Union wave', file: 'Union (2).svg', folder: 'elements', capacity: 'medium' },
  { id: 'union-glow-warm', label: 'Union glow warm', file: 'Union.svg', folder: 'elements', capacity: 'large' },
  { id: 'union-glow-cool', label: 'Union glow cool', file: 'Union (3).svg', folder: 'elements', capacity: 'large' },
]

export const gridTemplates: GridTemplate[] = [
  {
    id: 'central-mask',
    label: 'Text in mask',
    fitMode: 'contained',
    mask: { x: 0.04, y: 0.1, width: 0.92, height: 0.78 },
    texts: [
      {
        id: 'main',
        region: { x: 0.14, y: 0.28, width: 0.72, height: 0.42 },
        wrap: 'title',
        maxSize: 64,
        minSize: 28,
        lineHeight: 1.12,
      },
    ],
    defaultAlign: 'center',
    defaultVAlign: 'center',
  },
  {
    id: 'top-copy-bottom-mask',
    label: 'Copy top / mask bottom',
    fitMode: 'background',
    mask: { x: 0.03, y: 0.5, width: 0.94, height: 0.46 },
    texts: [
      {
        id: 'headline',
        region: { x: 0.07, y: 0.08, width: 0.86, height: 0.24 },
        wrap: 'title',
        maxSize: 86,
        minSize: 42,
        lineHeight: 1.05,
      },
      {
        id: 'body',
        region: { x: 0.07, y: 0.33, width: 0.86, height: 0.15 },
        wrap: 'body',
        maxSize: 32,
        minSize: 20,
        lineHeight: 1.2,
      },
    ],
    defaultAlign: 'left',
    defaultVAlign: 'top',
  },
  {
    id: 'split-copy',
    label: 'Headline / mask / body',
    fitMode: 'background',
    mask: { x: 0.04, y: 0.3, width: 0.92, height: 0.38 },
    texts: [
      {
        id: 'headline',
        region: { x: 0.07, y: 0.07, width: 0.86, height: 0.22 },
        wrap: 'title',
        maxSize: 86,
        minSize: 42,
        lineHeight: 1.05,
      },
      {
        id: 'body',
        region: { x: 0.07, y: 0.7, width: 0.86, height: 0.22 },
        wrap: 'body',
        maxSize: 32,
        minSize: 20,
        lineHeight: 1.2,
      },
    ],
    defaultAlign: 'left',
    defaultVAlign: 'top',
  },
  {
    id: 'editorial',
    label: 'Editorial text',
    fitMode: 'background',
    mask: { x: 0.08, y: 0.12, width: 0.84, height: 0.76 },
    texts: [
      {
        id: 'main',
        region: { x: 0.07, y: 0.08, width: 0.86, height: 0.84 },
        wrap: 'body',
        maxSize: 56,
        minSize: 28,
        lineHeight: 1.14,
      },
    ],
    defaultAlign: 'left',
    defaultVAlign: 'top',
  },
  {
    id: 'full-mask',
    label: 'Short line on mask',
    fitMode: 'contained',
    mask: { x: 0.02, y: 0.06, width: 0.96, height: 0.88 },
    texts: [
      {
        id: 'headline',
        region: { x: 0.1, y: 0.38, width: 0.8, height: 0.24 },
        wrap: 'title',
        maxSize: 92,
        minSize: 42,
        lineHeight: 1.0,
      },
    ],
    defaultAlign: 'center',
    defaultVAlign: 'center',
  },
]

export function getGrid(id: GridId): GridTemplate {
  return gridTemplates.find((grid) => grid.id === id) ?? gridTemplates[0]!
}

export function getGridMask(id: GridMaskId): GridMask {
  return gridMasks.find((mask) => mask.id === id) ?? gridMasks[0]!
}

export function regionPx(region: NormRect, width: number, height: number): Rect {
  return {
    x: region.x * width,
    y: region.y * height,
    width: region.width * width,
    height: region.height * height,
  }
}

export function gridMaskUrl(id: GridMaskId): string {
  const mask = getGridMask(id)
  if (mask.folder === 'elements') {
    return `./${encodeURI('svg elements')}/${encodeURIComponent(mask.file)}`
  }
  return `./media/grids/${mask.file}`
}

export const LINES_SVG_URL = `./${encodeURI('svg elements')}/${encodeURIComponent('lines.svg')}`
