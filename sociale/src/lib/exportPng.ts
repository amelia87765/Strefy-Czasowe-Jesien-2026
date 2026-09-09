export function downloadPngTemplate(options: {
  width: number
  height: number
  filename: string
  title: string
}): void {
  const { width, height, filename, title } = options
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) {
    throw new Error('Przeglądarka nie udostępnia canvas 2D.')
  }

  ctx.fillStyle = '#1c1917'
  ctx.fillRect(0, 0, width, height)

  const line = Math.max(2, Math.round(Math.min(width, height) * 0.004))
  ctx.strokeStyle = '#c2410c'
  ctx.lineWidth = line
  ctx.strokeRect(line / 2, line / 2, width - line, height - line)

  ctx.strokeStyle = '#44403c'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(width / 2, 0)
  ctx.lineTo(width / 2, height)
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()

  const fontSize = Math.max(28, Math.round(Math.min(width, height) * 0.05))
  ctx.fillStyle = '#fafaf9'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, sans-serif`
  ctx.fillText(`${width} × ${height} px`, width / 2, height / 2 - fontSize * 0.15)
  ctx.font = `500 ${Math.round(fontSize * 0.42)}px ui-sans-serif, system-ui, sans-serif`
  ctx.fillStyle = '#d6d3d1'
  ctx.fillText(title, width / 2, height / 2 + fontSize * 0.7)

  canvas.toBlob((blob) => {
    if (!blob) {
      throw new Error('Nie udało się zbudować pliku PNG.')
    }
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = filename
    anchor.rel = 'noopener'
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }, 'image/png')
}

export async function copyText(value: string): Promise<void> {
  await navigator.clipboard.writeText(value)
}
