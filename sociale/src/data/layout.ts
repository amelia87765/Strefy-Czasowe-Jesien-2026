import type { Format } from '@/data/brand'

export type Rect = { x: number; y: number; width: number; height: number }

export const NAME_FONT = 140
export const NAME_LINE_HEIGHT = 0.85
export const NAME_LETTER_SPACING = -0.01
export const NAME_BOX_WIDTH = 927.04
export const DESC_FONT = 50
export const DESC_LINE_HEIGHT = 0.9
export const DESC_BOX_WIDTH = 927.64
export const DESC_BOX_HEIGHT = 45
export const SIDE_INSET = 76.18
export const TEXT_INK = '#2E202C'

const NAME_X = (1080 - NAME_BOX_WIDTH) / 2
const DESC_X = (1080 - DESC_BOX_WIDTH) / 2

type LineCount = 1 | 2

type FormatLayout = {
  name: Rect
  description: Rect
  textSafe: Rect
  chrome: Rect[]
  nameDanger: Rect
}

const postChrome: Rect[] = [
  { x: 0, y: 0, width: 50, height: 1350 },
  { x: 1030, y: 0, width: 50, height: 1350 },
  { x: 0, y: 0, width: 1080, height: 180 },
  { x: 0, y: 1170, width: 1080, height: 180 },
  { x: 0, y: 0, width: SIDE_INSET, height: 1350 },
  { x: 1003.82, y: 0, width: SIDE_INSET, height: 1350 },
  { x: 0, y: 2.62, width: 1080, height: 68.82 },
  { x: 0, y: 1231.37, width: 1080, height: 118.63 },
]

const storyChrome: Rect[] = [
  { x: 0, y: 0, width: 50, height: 1920 },
  { x: 1030, y: 0, width: 50, height: 1920 },
  { x: 0, y: 0, width: 1080, height: 250 },
  { x: 0, y: 1670, width: 1080, height: 250 },
  { x: 0, y: 0, width: SIDE_INSET, height: 1920 },
  { x: 1003.82, y: 0, width: SIDE_INSET, height: 1920 },
  { x: 0, y: 0, width: 1080, height: 188.78 },
  { x: 0, y: 1670.51, width: 1080, height: 249.49 },
]

const post: Record<LineCount, FormatLayout> = {
  1: {
    name: { x: NAME_X, y: 1062.27, width: NAME_BOX_WIDTH, height: 119 },
    description: { x: DESC_X, y: 1186.37, width: DESC_BOX_WIDTH, height: DESC_BOX_HEIGHT },
    textSafe: { x: SIDE_INSET, y: 180, width: DESC_BOX_WIDTH, height: 990 },
    chrome: postChrome,
    nameDanger: { x: 0, y: 1009.43, width: 1080, height: 340.57 },
  },
  2: {
    name: { x: NAME_X, y: 943.27, width: NAME_BOX_WIDTH, height: 238 },
    description: { x: DESC_X, y: 1186.37, width: DESC_BOX_WIDTH, height: DESC_BOX_HEIGHT },
    textSafe: { x: SIDE_INSET, y: 180, width: DESC_BOX_WIDTH, height: 990 },
    chrome: postChrome,
    nameDanger: { x: 0, y: 887.43, width: 1080, height: 462.57 },
  },
}

const story: Record<LineCount, FormatLayout> = {
  1: {
    name: { x: NAME_X, y: 1506.41, width: NAME_BOX_WIDTH, height: 119 },
    description: { x: DESC_X, y: 1630.51, width: DESC_BOX_WIDTH, height: DESC_BOX_HEIGHT },
    textSafe: { x: SIDE_INSET, y: 250, width: DESC_BOX_WIDTH, height: 1420 },
    chrome: storyChrome,
    nameDanger: { x: 0, y: 1444.77, width: 1080, height: 475.22 },
  },
  2: {
    name: { x: NAME_X, y: 1387.41, width: NAME_BOX_WIDTH, height: 238 },
    description: { x: DESC_X, y: 1630.51, width: DESC_BOX_WIDTH, height: DESC_BOX_HEIGHT },
    textSafe: { x: SIDE_INSET, y: 250, width: DESC_BOX_WIDTH, height: 1420 },
    chrome: storyChrome,
    nameDanger: { x: 0, y: 1338.77, width: 1080, height: 581.22 },
  },
}

export function getLayout(format: Format, lines: LineCount): FormatLayout {
  return format === 'post' ? post[lines] : story[lines]
}
