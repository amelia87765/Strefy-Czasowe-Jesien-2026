import { overlayFolder, SHAPE_FILES, type Format } from '@/data/brand'
import { gridMaskUrl, LINES_SVG_URL, type GridMaskId } from '@/data/grids'

const cache = new Map<string, HTMLImageElement>()

export function overlayUrl(format: Format, lines: 1 | 2, index: number): string {
  const file = SHAPE_FILES[index] ?? SHAPE_FILES[0]
  return `${overlayFolder(format, lines)}/${file}`
}

export async function loadOverlay(
  format: Format,
  lines: 1 | 2,
  index: number,
  color: string,
): Promise<HTMLImageElement> {
  const href = overlayUrl(format, lines, index)
  const key = `${href}|${color}`
  const hit = cache.get(key)
  if (hit) return hit

  const response = await fetch(href)
  if (!response.ok) {
    throw new Error(`Nie udało się wczytać maski ${href}`)
  }
  const raw = await response.text()
  const colored = raw
    .replace(/fill="#D9D9D9"/gi, `fill="${color}" fill-rule="evenodd"`)
    .replace(/fill="#d9d9d9"/gi, `fill="${color}" fill-rule="evenodd"`)

  const blob = new Blob([colored], { type: 'image/svg+xml' })
  const objectUrl = URL.createObjectURL(blob)
  const image = await loadImage(objectUrl)
  URL.revokeObjectURL(objectUrl)
  cache.set(key, image)
  return image
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Nie udało się wczytać obrazu.'))
    image.src = src
  })
}

async function loadColoredSvg(href: string, color: string): Promise<HTMLImageElement> {
  const key = `${href}|${color}`
  const hit = cache.get(key)
  if (hit) return hit

  const response = await fetch(href)
  if (!response.ok) {
    throw new Error(`Nie udało się wczytać ${href}`)
  }
  const raw = await response.text()
  const colored = raw
    .replace(/\sfilter="url\([^)]+\)"/gi, '')
    .replace(/fill="(?!none)([^"]*)"/gi, `fill="${color}"`)
  const blob = new Blob([colored], { type: 'image/svg+xml' })
  const objectUrl = URL.createObjectURL(blob)
  const image = await loadImage(objectUrl)
  URL.revokeObjectURL(objectUrl)
  cache.set(key, image)
  return image
}

export async function loadGridMask(id: GridMaskId, color: string): Promise<HTMLImageElement> {
  return loadColoredSvg(gridMaskUrl(id), color)
}

export async function loadLines(color: string): Promise<HTMLImageElement> {
  return loadColoredSvg(LINES_SVG_URL, color)
}

export function coverDraw(
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement,
  width: number,
  height: number,
  scale: number,
  panX: number,
  panY: number,
) {
  const base = Math.max(width / photo.width, height / photo.height)
  const s = base * Math.max(1, scale)
  const w = photo.width * s
  const h = photo.height * s
  const x = (width - w) / 2 + panX
  const y = (height - h) / 2 + panY
  ctx.drawImage(photo, x, y, w, h)
}

