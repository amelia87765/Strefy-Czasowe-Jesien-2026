declare module 'virtual:svg-shapes' {
  export type OverlayKey = 'post-1' | 'post-2' | 'story-1' | 'story-2'

  export const svgShapes: {
    grids: string[]
    text: string[]
    lines: string[]
    gradients: string[]
    overlays: Record<OverlayKey, string[]>
  }
}
