export function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
  type: 'image/png' | 'image/jpeg',
): void {
  const quality = type === 'image/jpeg' ? 0.92 : undefined
  canvas.toBlob(
    (blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = filename
      document.body.append(anchor)
      anchor.click()
      anchor.remove()
      URL.revokeObjectURL(url)
    },
    type,
    quality,
  )
}
