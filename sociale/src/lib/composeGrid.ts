import { CLASSICO, GROTESK, type TextAlign, type TextVAlign } from '@/data/brand'
import { getGrid, regionPx, type GridId } from '@/data/grids'
import { coverDraw, loadGridMask, loadLines } from '@/lib/overlays'
import { drawAlignedBlock, fitLines } from '@/lib/textLayout'

export type GridComposeFields = {
  gridId: GridId
  gridMaskFile: string
  gridHeadline: string
  shapeColor: string
  bodyColor: string
  shapeGlow: boolean
  glowColor: string
  showLines: boolean
  linesColor: string
  linesPanX: number
  linesPanY: number
}

type GridDrawInput = GridComposeFields & {
  bodyText: string
  textColor: string
  textAlign: TextAlign
  textVAlign: TextVAlign
  photo: HTMLImageElement | null
  scale: number
  panX: number
  panY: number
}

function containRect(
  srcW: number,
  srcH: number,
  box: { x: number; y: number; width: number; height: number },
) {
  const scale = Math.min(box.width / srcW, box.height / srcH)
  const width = srcW * scale
  const height = srcH * scale
  return {
    x: box.x + (box.width - width) / 2,
    y: box.y + (box.height - height) / 2,
    width,
    height,
  }
}

function drawShapeLayer(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  box: { x: number; y: number; width: number; height: number },
  glow: boolean,
  editorial: boolean,
) {
  const dest = containRect(image.naturalWidth || image.width, image.naturalHeight || image.height, box)
  if (glow) {
    ctx.save()
    ctx.filter = editorial ? 'blur(72px)' : 'blur(42px)'
    ctx.globalAlpha = editorial ? 0.85 : 0.9
    const pad = editorial ? 80 : 36
    ctx.drawImage(image, dest.x - pad, dest.y - pad, dest.width + pad * 2, dest.height + pad * 2)
    ctx.restore()
    return
  }
  ctx.save()
  ctx.globalAlpha = editorial ? 0.55 : 1
  ctx.drawImage(image, dest.x, dest.y, dest.width, dest.height)
  ctx.restore()
}

function slotText(slotId: string, input: GridDrawInput): string {
  if (slotId === 'headline') return input.gridHeadline.trim()
  if (slotId === 'body') return input.bodyText.trim()
  return input.bodyText.trim() || input.gridHeadline.trim()
}

function slotColor(slotId: string, input: GridDrawInput): string {
  if (slotId === 'body') return input.bodyColor
  if (slotId === 'headline') return input.textColor
  return input.textColor
}

function slotFont(slotId: string, wrap: 'title' | 'body'): string {
  if (slotId === 'body' || wrap === 'body') return GROTESK
  return CLASSICO
}

export async function composeGrid(
  ctx: CanvasRenderingContext2D,
  input: GridDrawInput,
  width: number,
  height: number,
): Promise<void> {
  const grid = getGrid(input.gridId)
  if (input.photo) {
    coverDraw(ctx, input.photo, width, height, input.scale, input.panX, input.panY)
  }

  if (input.showLines) {
    const lines = await loadLines(input.linesColor)
    if (lines) coverDraw(ctx, lines, width, height, 1, input.linesPanX, input.linesPanY)
  }

  const maskBox = regionPx(grid.mask, width, height)
  const editorial = grid.id === 'editorial'
  if (input.shapeGlow && input.gridMaskFile) {
    const glow = await loadGridMask(input.gridMaskFile, input.glowColor)
    if (glow) drawShapeLayer(ctx, glow, maskBox, true, editorial)
  }
  if (input.gridMaskFile) {
    const shape = await loadGridMask(input.gridMaskFile, input.shapeColor)
    if (shape) drawShapeLayer(ctx, shape, maskBox, false, editorial)
  }

  for (const slot of grid.texts) {
    const text = slotText(slot.id, input)
    if (!text) continue
    const box = regionPx(slot.region, width, height)
    const font = slotFont(slot.id, slot.wrap)
    const fitted = fitLines(
      ctx,
      text,
      box.width,
      box.height,
      font,
      slot.minSize,
      slot.maxSize,
      slot.lineHeight,
      slot.wrap,
    )
    ctx.fillStyle = slotColor(slot.id, input)
    ctx.font = `${fitted.fontSize}px ${font}`
    drawAlignedBlock(
      ctx,
      fitted.lines,
      box,
      fitted.fontSize,
      slot.lineHeight,
      input.textAlign,
      input.textVAlign,
    )
  }
}

export function drawGridGuides(
  ctx: CanvasRenderingContext2D,
  gridId: GridId,
  width: number,
  height: number,
) {
  const grid = getGrid(gridId)
  const mask = regionPx(grid.mask, width, height)
  ctx.strokeStyle = '#00C2FF'
  ctx.lineWidth = 3
  ctx.strokeRect(mask.x, mask.y, mask.width, mask.height)
  ctx.fillStyle = 'rgba(0, 194, 255, 0.08)'
  ctx.fillRect(mask.x, mask.y, mask.width, mask.height)

  ctx.strokeStyle = '#E100FF'
  ctx.fillStyle = 'rgba(225, 0, 255, 0.12)'
  for (const slot of grid.texts) {
    const box = regionPx(slot.region, width, height)
    ctx.strokeRect(box.x, box.y, box.width, box.height)
    ctx.fillRect(box.x, box.y, box.width, box.height)
  }
}
