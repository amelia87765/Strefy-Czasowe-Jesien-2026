const grains = new Map<string, HTMLCanvasElement>()

export function grainCanvas(width: number, height: number): HTMLCanvasElement {
  const key = `${width}x${height}`
  const hit = grains.get(key)
  if (hit) return hit

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const pixels = ctx.createImageData(width, height)
  const data = pixels.data
  for (let i = 0; i < data.length; i += 4) {
    const n = Math.random() * 255
    data[i] = n
    data[i + 1] = n
    data[i + 2] = n
    data[i + 3] = 48
  }
  ctx.putImageData(pixels, 0, 0)
  grains.set(key, canvas)
  return canvas
}
