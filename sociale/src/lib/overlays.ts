import type { Format } from '@/data/brand'
import {
  artistShapeUrl,
  gridShapeUrl,
  keepShape,
  linesShapeFiles,
  linesShapeUrl,
  textShapeUrl,
} from '@/data/shapes'

const cache = new Map<string, HTMLImageElement>()

export function overlayUrl(format: Format, lines: 1 | 2, file: string): string {
  return artistShapeUrl(format, lines, file)
}

export async function loadOverlay(
  format: Format,
  lines: 1 | 2,
  file: string,
  color: string,
): Promise<HTMLImageElement | null> {
  const href = overlayUrl(format, lines, file)
  if (!href) return null

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

function tintSvg(raw: string, color: string): string {
  return raw
    .replace(/\sfilter="url\([^)]+\)"/gi, '')
    .replace(/fill="(?!none|url\()([^"]*)"/gi, `fill="${color}"`)
    .replace(/stroke="(?!none)([^"]*)"/gi, `stroke="${color}"`)
    .replace(/stop-color="[^"]*"/gi, `stop-color="${color}"`)
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
  const colored = tintSvg(raw, color)
  const blob = new Blob([colored], { type: 'image/svg+xml' })
  const objectUrl = URL.createObjectURL(blob)
  const image = await loadImage(objectUrl)
  URL.revokeObjectURL(objectUrl)
  cache.set(key, image)
  return image
}

export async function loadGridMask(file: string, color: string): Promise<HTMLImageElement | null> {
  if (!file) return null
  return loadColoredSvg(gridShapeUrl(file), color)
}

export async function loadTextShape(file: string, color: string): Promise<HTMLImageElement | null> {
  if (!file) return null
  return loadColoredSvg(textShapeUrl(file), color)
}

export async function loadLines(color: string, fileName?: string): Promise<HTMLImageElement | null> {
  const file = keepShape(fileName ?? '', linesShapeFiles())
  if (!file) return null
  return loadColoredSvg(linesShapeUrl(file), color)
}

export function drawContainedShape(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  box: { x: number; y: number; width: number; height: number },
  glow = false,
) {
  const srcW = image.naturalWidth || image.width
  const srcH = image.naturalHeight || image.height
  const scale = Math.min(box.width / srcW, box.height / srcH)
  const width = srcW * scale
  const height = srcH * scale
  const x = box.x + (box.width - width) / 2
  const y = box.y + (box.height - height) / 2
  if (glow) {
    ctx.save()
    ctx.filter = 'blur(42px)'
    ctx.globalAlpha = 0.9
    const pad = 36
    ctx.drawImage(image, x - pad, y - pad, width + pad * 2, height + pad * 2)
    ctx.restore()
    return
  }
  ctx.drawImage(image, x, y, width, height)
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

export function containDraw(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  box: { x: number; y: number; width: number; height: number },
) {
  const srcW = image.naturalWidth || image.width
  const srcH = image.naturalHeight || image.height
  const scale = Math.min(box.width / srcW, box.height / srcH)
  const width = srcW * scale
  const height = srcH * scale
  const x = box.x + (box.width - width) / 2
  const y = box.y + (box.height - height) / 2
  ctx.drawImage(image, x, y, width, height)
}
