import { canvasSize, type ContentType, type Format, type TextAlign, type TextVAlign } from '@/data/brand'
import type { GridId, GridMaskId } from '@/data/grids'
import { compose } from '@/lib/compose'
import { downloadCanvas } from '@/lib/exportImage'
import { useEffect, useRef } from 'react'

type PreviewStageProps = {
  format: Format
  contentType: ContentType
  artistName: string
  description: string
  bodyText: string
  overlayIndex: number
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
  onPan: (x: number, y: number) => void
  onScale: (scale: number) => void
  gridId: GridId
  gridMaskId: GridMaskId
  gridHeadline: string
  shapeColor: string
  bodyColor: string
  shapeGlow: boolean
  glowColor: string
  showLines: boolean
  linesColor: string
  linesPanX: number
  linesPanY: number
  onLinesPan: (x: number, y: number) => void
}

export function PreviewStage(props: PreviewStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drag = useRef<{
    kind: 'photo' | 'lines'
    x: number
    y: number
    panX: number
    panY: number
  } | null>(null)
  const propsRef = useRef(props)

  useEffect(() => {
    propsRef.current = props
  }, [props])
  const { width, height } = canvasSize(props.format)
  const canPanLines = props.contentType === 'grids' && props.showLines
  const canPanPhoto = props.photo !== null
  const canPan = canPanLines || canPanPhoto

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let cancelled = false
    void compose(ctx, {
      format: props.format,
      contentType: props.contentType,
      artistName: props.artistName,
      description: props.description,
      bodyText: props.bodyText,
      overlayIndex: props.overlayIndex,
      overlayColor: props.overlayColor,
      textColor: props.textColor,
      textAlign: props.textAlign,
      textVAlign: props.textVAlign,
      applyGrain: props.applyGrain,
      showGuides: props.showGuides,
      photo: props.photo,
      scale: props.scale,
      panX: props.panX,
      panY: props.panY,
      gridId: props.gridId,
      gridMaskId: props.gridMaskId,
      gridHeadline: props.gridHeadline,
      shapeColor: props.shapeColor,
      bodyColor: props.bodyColor,
      shapeGlow: props.shapeGlow,
      glowColor: props.glowColor,
      showLines: props.showLines,
      linesColor: props.linesColor,
      linesPanX: props.linesPanX,
      linesPanY: props.linesPanY,
    }).then(() => {
      if (cancelled) return
    })
    return () => {
      cancelled = true
    }
  }, [props])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onWheel = (event: WheelEvent) => {
      const current = propsRef.current
      if (!current.photo) return
      event.preventDefault()
      const next = Math.min(4, Math.max(1, current.scale * (event.deltaY > 0 ? 0.92 : 1.08)))
      current.onScale(next)
    }
    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', onWheel)
  }, [])

  const exportFrame = (type: 'image/png' | 'image/jpeg') => {
    const out = document.createElement('canvas')
    out.width = width
    out.height = height
    const ctx = out.getContext('2d')
    if (!ctx) return
    void compose(ctx, {
      format: props.format,
      contentType: props.contentType,
      artistName: props.artistName,
      description: props.description,
      bodyText: props.bodyText,
      overlayIndex: props.overlayIndex,
      overlayColor: props.overlayColor,
      textColor: props.textColor,
      textAlign: props.textAlign,
      textVAlign: props.textVAlign,
      applyGrain: props.applyGrain,
      showGuides: false,
      photo: props.photo,
      scale: props.scale,
      panX: props.panX,
      panY: props.panY,
      gridId: props.gridId,
      gridMaskId: props.gridMaskId,
      gridHeadline: props.gridHeadline,
      shapeColor: props.shapeColor,
      bodyColor: props.bodyColor,
      shapeGlow: props.shapeGlow,
      glowColor: props.glowColor,
      showLines: props.showLines,
      linesColor: props.linesColor,
      linesPanX: props.linesPanX,
      linesPanY: props.linesPanY,
    }).then(() => {
      const ext = type === 'image/png' ? 'png' : 'jpg'
      downloadCanvas(out, `strefy-${props.format}-${width}x${height}.${ext}`, type)
    })
  }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-4 bg-paper px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`max-h-[70vh] max-w-full bg-white shadow-[0_12px_40px_rgba(16,24,40,0.12)] md:max-h-full ${
            canPan ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          style={{ aspectRatio: `${width} / ${height}` }}
          onPointerDown={(event) => {
            if (!canPan) return
            event.currentTarget.setPointerCapture(event.pointerId)
            const kind = canPanLines ? 'lines' : 'photo'
            drag.current = {
              kind,
              x: event.clientX,
              y: event.clientY,
              panX: kind === 'lines' ? props.linesPanX : props.panX,
              panY: kind === 'lines' ? props.linesPanY : props.panY,
            }
          }}
          onPointerMove={(event) => {
            if (!drag.current) return
            const canvas = canvasRef.current
            if (!canvas) return
            const rect = canvas.getBoundingClientRect()
            const sx = width / rect.width
            const sy = height / rect.height
            const nextX = drag.current.panX + (event.clientX - drag.current.x) * sx
            const nextY = drag.current.panY + (event.clientY - drag.current.y) * sy
            if (drag.current.kind === 'lines') props.onLinesPan(nextX, nextY)
            else props.onPan(nextX, nextY)
          }}
          onPointerUp={() => {
            drag.current = null
          }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
          Export
        </span>
        <button
          type="button"
          className="min-h-9 rounded-full bg-ink px-4 py-2 text-xs font-medium text-white"
          onClick={() => exportFrame('image/png')}
        >
          PNG
        </button>
        <button
          type="button"
          className="min-h-9 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium"
          onClick={() => exportFrame('image/jpeg')}
        >
          JPG
        </button>
      </div>
    </section>
  )
}
