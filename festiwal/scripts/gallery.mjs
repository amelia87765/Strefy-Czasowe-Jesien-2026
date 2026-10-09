import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

/**
 * Galeria: `media/galeria/*.jpg` → `public/festiwal_foto/galeria/*-{480,960,full}.webp`
 * oraz lista zdjęć z wymiarami w `src/data/gallery.generated.ts`. Kolejność na stronie = kolejność nazw plików.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'media', 'galeria')
const out = path.join(root, 'public', 'festiwal_foto', 'galeria')
const manifest = path.join(root, 'src', 'data', 'gallery.generated.ts')

const FULL = 1600
const WIDTHS = [480, 960, FULL]
const QUALITY = 72
const PHOTO_EXT = /\.(jpe?g|png|webp)$/i

function slug(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/\(\s*-/g, ' minus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Wymiary z nagłówka WebP (VP8 / VP8L / VP8X). */
function webpSize(file) {
  const b = readFileSync(file)
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
  }
  if (chunk === 'VP8X') return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1]
  throw new Error(`Nieznany format WebP: ${file}`)
}

/** Miniatury mają stałą szerokość (pod `srcset`), pełny podgląd mieści się w kwadracie FULL × FULL. */
function encode(input, target, width) {
  const scale =
    width === FULL
      ? `scale='min(${FULL},iw)':'min(${FULL},ih)':force_original_aspect_ratio=decrease:flags=lanczos`
      : `scale='min(${width},iw)':-2:flags=lanczos`
  execFileSync(
    ffmpeg,
    [
      '-hide_banner', '-loglevel', 'error', '-y',
      '-i', input,
      '-vf', scale,
      '-map_metadata', '-1',
      '-c:v', 'libwebp', '-quality', String(QUALITY), '-preset', 'photo',
      target,
    ],
    { stdio: 'inherit' },
  )
}

let files = []
try {
  files = readdirSync(src)
    .filter((name) => PHOTO_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, 'pl', { numeric: true }))
} catch {
  console.log('Brak folderu media/galeria/, zapisuję pustą galerię.')
}

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })
let bytes = 0
const used = new Set()
const photos = files.map((name) => {
  const stem = slug(name.replace(PHOTO_EXT, '')) || 'foto'
  let base = stem
  for (let n = 2; used.has(base); n++) base = `${stem}-${n}`
  used.add(base)
  let size = [0, 0]
  for (const width of WIDTHS) {
    const target = path.join(out, `${base}-${width === FULL ? 'full' : width}.webp`)
    encode(path.join(src, name), target, width)
    bytes += statSync(target).size
    size = webpSize(target)
  }
  console.log(`${name} -> ${size[0]}x${size[1]}`)
  return { src: `festiwal_foto/galeria/${base}`, width: size[0], height: size[1] }
})

writeFileSync(
  manifest,
  `// Plik generowany przez \`npm run gallery\`, nie edytuj ręcznie.\n` +
    `import type { AlbumPhoto } from '@/data/pages'\n\n` +
    `export const GALLERY: AlbumPhoto[] = ${JSON.stringify(photos, null, 2)}\n`,
)
console.log(`Gotowe: ${photos.length} zdjęć, ${(bytes / 1024 / 1024).toFixed(1)} MB łącznie we wszystkich rozmiarach.`)
