import { CLASSICO, GROTESK, canvasSize, type ContentType, type Format, type TextAlign, type TextVAlign } from '@/data/brand'
import {
  DESC_FONT,
  NAME_BOX_WIDTH,
  NAME_FONT,
  NAME_LETTER_SPACING,
  NAME_LINE_HEIGHT,
  getLayout,
} from '@/data/layout'
import { composeGrid, drawGridGuides, type GridComposeFields } from '@/lib/composeGrid'
import { grainCanvas } from '@/lib/grain'
import { coverDraw, drawContainedShape, loadLines, loadOverlay, loadTextShape } from '@/lib/overlays'
import { drawRichText, fitRichText, loadTypefaces } from '@/lib/richText'
import { measureWidth, wrapName } from '@/lib/textLayout'

export type ComposeInput = {
  format: Format
  contentType: ContentType
  artistName: string
  description: string
  bodyText: string
  overlayFile: string
  overlayColor: string
  textColor: string
  textAlign: TextAlign
  textVAlign: TextVAlign
  applyGrain: boolean
  showGuides: boolean
  photo: HTMLImageElement | null
  scale: number
  panX: number
  panY: number
  textShapeFile: string
  typeSizeFactor: number
  linesFile: string
  gradient: HTMLImageElement | null
} & GridComposeFields

function setLetterSpacing(ctx: CanvasRenderingContext2D, value: string) {
  const spaced = ctx as CanvasRenderingContext2D & { letterSpacing?: string }
  spaced.letterSpacing = value
}

function drawName(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  box: { x: number; y: number; width: number; height: number },
) {
  setLetterSpacing(ctx, `${NAME_LETTER_SPACING}em`)
  let fontSize = NAME_FONT
  const lineHeight = NAME_LINE_HEIGHT
  while (fontSize > 48) {
    ctx.font = `${fontSize}px ${CLASSICO}`
    const tooWide = lines.some((line) => measureWidth(ctx, line) > box.width)
    const tooTall = lines.length * fontSize * lineHeight > box.height + 0.5
    if (!tooWide && !tooTall) break
    fontSize -= 1
  }
  ctx.font = `${fontSize}px ${CLASSICO}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  const step = fontSize * lineHeight
  let y = box.y + box.height
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    ctx.fillText(lines[i] ?? '', box.x + box.width / 2, y)
    y -= step
  }
  setLetterSpacing(ctx, '0px')
}

function drawDescription(
  ctx: CanvasRenderingContext2D,
  text: string,
  box: { x: number; y: number; width: number; height: number },
) {
  let fontSize = DESC_FONT
  ctx.font = `${fontSize}px ${GROTESK}`
  while (fontSize > 14 && measureWidth(ctx, text) > box.width) {
    fontSize -= 1
    ctx.font = `${fontSize}px ${GROTESK}`
  }
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, box.x + box.width / 2, box.y + box.height / 2)
}

export async function compose(ctx: CanvasRenderingContext2D, input: ComposeInput): Promise<void> {
  await document.fonts.ready
  await Promise.all([
    document.fonts.load(`${NAME_FONT}px "URW Classico"`),
    document.fonts.load(`${DESC_FONT}px "Akzidenz-Grotesk Next"`),
  ])
  const { width, height } = canvasSize(input.format)
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = input.overlayColor
  ctx.fillRect(0, 0, width, height)

  const name = input.artistName.trim()
  ctx.font = `${NAME_FONT}px ${CLASSICO}`
  setLetterSpacing(ctx, `${NAME_LETTER_SPACING}em`)
  const displayName = wrapName(ctx, name, NAME_BOX_WIDTH)
  setLetterSpacing(ctx, '0px')
  const linesCount: 1 | 2 = displayName.length > 1 ? 2 : 1
  const layout = getLayout(input.format, input.contentType === 'artist' ? linesCount : 1)

  if (input.contentType === 'grids') {
    await composeGrid(ctx, input, width, height)
  } else if (input.contentType === 'artist') {
    if (input.photo) {
      coverDraw(ctx, input.photo, width, height, input.scale, input.panX, input.panY)
    }

    const overlay = await loadOverlay(
      input.format,
      linesCount,
      input.overlayFile,
      input.overlayColor,
    )
    if (overlay) ctx.drawImage(overlay, 0, 0, width, height)

    if (name) {
      ctx.fillStyle = input.textColor
      drawName(ctx, displayName.length > 0 ? displayName : [name], layout.name)
    }

    const role = input.description.trim().toUpperCase()
    if (role) {
      ctx.fillStyle = input.textColor
      drawDescription(ctx, role, layout.description)
    }
  } else {
    if (input.photo) {
      coverDraw(ctx, input.photo, width, height, input.scale, input.panX, input.panY)
    } else if (input.gradient) {
      const panY = input.format === 'post' ? input.panY : 0
      coverDraw(ctx, input.gradient, width, height, 1, 0, panY)
    }
    if (input.showLines) {
      const lines = await loadLines(input.linesColor, input.linesFile)
      if (lines) coverDraw(ctx, lines, width, height, 1, input.linesPanX, input.linesPanY)
    }
    if (input.textShapeFile) {
      const box = {
        x: width * 0.04,
        y: height * 0.08,
        width: width * 0.92,
        height: height * 0.84,
      }
      if (input.shapeGlow) {
        const glow = await loadTextShape(input.textShapeFile, input.glowColor)
        if (glow) drawContainedShape(ctx, glow, box, true)
      }
      const shape = await loadTextShape(input.textShapeFile, input.shapeColor)
      if (shape) drawContainedShape(ctx, shape, box, false)
    }
    const text = input.bodyText.trim()
    if (text) {
      const kind = input.contentType === 'large' ? 'large' : 'small'
      await loadTypefaces(kind)
      ctx.fillStyle = input.textColor
      const fitted = fitRichText(
        ctx,
        input.bodyText,
        kind,
        layout.textSafe.width,
        layout.textSafe.height,
        kind === 'large' ? input.typeSizeFactor : 1,
      )
      drawRichText(
        ctx,
        fitted.lines,
        kind,
        fitted.scale,
        layout.textSafe,
        input.textAlign,
        input.textVAlign,
      )
    }
  }

  if (input.applyGrain) {
    ctx.save()
    ctx.globalCompositeOperation = 'overlay'
    ctx.drawImage(grainCanvas(width, height), 0, 0, width, height)
    ctx.restore()
  }

  if (input.showGuides) {
    ctx.save()
    if (input.contentType === 'grids') {
      drawGridGuides(ctx, input.gridId, width, height)
    } else {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.25)'
      for (const guide of layout.chrome) {
        ctx.fillRect(guide.x, guide.y, guide.width, guide.height)
      }
      if (input.contentType === 'artist') {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.fillRect(
          layout.nameDanger.x,
          layout.nameDanger.y,
          layout.nameDanger.width,
          layout.nameDanger.height,
        )
      }
    }
    ctx.strokeStyle = '#FF0000'
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, width - 2, height - 2)
    ctx.restore()
  }
}
