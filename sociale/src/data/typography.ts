import { CLASSICO, HANKEN, PALLADIO } from '@/data/brand'

export type TextKind = 'small' | 'large'
export type TextRole = 'regular' | 'italic' | 'bold' | 'h3'

export type TypeFace = {
  family: string
  canvasStyle: '' | 'italic '
  weight: 400 | 700
  max: number
  min: number
}

export const TYPE = {
  large: {
    lineHeight: 1.05,
    wrap: 'title' as const,
    regular: { family: CLASSICO, canvasStyle: '' as const, weight: 400 as const, max: 90, min: 28 },
    italic: { family: PALLADIO, canvasStyle: 'italic ' as const, weight: 400 as const, max: 90, min: 28 },
  },
  small: {
    lineHeight: 1.2,
    wrap: 'body' as const,
    regular: { family: HANKEN, canvasStyle: '' as const, weight: 400 as const, max: 40, min: 12 },
    bold: { family: HANKEN, canvasStyle: '' as const, weight: 700 as const, max: 40, min: 12 },
    h3: { family: CLASSICO, canvasStyle: '' as const, weight: 400 as const, max: 48, min: 18 },
  },
}

export const LARGE_SIZE_STEP = 0.05
export const LARGE_SIZE_MIN_FACTOR = TYPE.large.regular.min / TYPE.large.regular.max

export function faceFor(kind: TextKind, role: TextRole): TypeFace {
  if (kind === 'large') {
    return role === 'italic' ? TYPE.large.italic : TYPE.large.regular
  }
  if (role === 'h3') return TYPE.small.h3
  if (role === 'bold') return TYPE.small.bold
  return TYPE.small.regular
}

export function scaledSize(face: TypeFace, scale: number): number {
  return Math.min(face.max, Math.max(face.min, face.max * scale))
}

export function canvasFont(face: TypeFace, size: number): string {
  return `${face.canvasStyle}${face.weight} ${size}px ${face.family}`
}
