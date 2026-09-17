import { overlayFolder, type Format } from '@/data/brand'
import { svgShapes } from 'virtual:svg-shapes'

export function keepShape(current: string, files: string[]): string {
  return files.includes(current) ? current : (files[0] ?? '')
}

export function gridShapeFiles(): string[] {
  return svgShapes.grids
}

export function textShapeFiles(): string[] {
  return svgShapes.text
}

export function linesShapeFiles(): string[] {
  return svgShapes.lines
}

export function gradientFiles(): string[] {
  return svgShapes.gradients
}

export function artistShapeFiles(format: Format, lines: 1 | 2): string[] {
  return svgShapes.overlays[`${format}-${lines}`]
}

export function gridShapeUrl(file: string): string {
  return `./shapes/grids/${encodeURIComponent(file)}`
}

export function textShapeUrl(file: string): string {
  return `./shapes/text/${encodeURIComponent(file)}`
}

export function linesShapeUrl(file: string): string {
  return `./shapes/lines/${encodeURIComponent(file)}`
}

export function gradientUrl(file: string): string {
  return `./shapes/gradients/${encodeURIComponent(file)}`
}

export function artistShapeUrl(format: Format, lines: 1 | 2, file: string): string {
  const chosen = keepShape(file, artistShapeFiles(format, lines))
  if (!chosen) return ''
  return `${overlayFolder(format, lines)}/${encodeURIComponent(chosen)}`
}

export function shapeLabel(file: string): string {
  return file.replace(/\.svg$/i, '')
}
