import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'media')
const out = path.join(root, 'public', 'festiwal_foto')

const VIDEO = 'poprzednia-original.mp4'
const PHOTO_EDGE = 1600
const LOOP_SECONDS = 8

mkdirSync(out, { recursive: true })

function run(args) {
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
}

function mb(file) {
  return `${(statSync(file).size / 1024 / 1024).toFixed(2)} MB`
}

const PHOTO_DIRS = ['', 'artysci', 'o-festiwalu']

const photos = PHOTO_DIRS.flatMap((dir) => {
  const from = path.join(src, dir)
  try {
    return readdirSync(from)
      .filter((name) => /\.(jpe?g|png)$/i.test(name))
      .map((name) => path.join(dir, name))
  } catch {
    return []
  }
})
for (const name of photos) {
  const target = path.join(out, name.replace(/\.(jpe?g|png)$/i, '.jpg'))
  mkdirSync(path.dirname(target), { recursive: true })
  run([
    '-i',
    path.join(src, name),
    '-vf',
    `scale='if(gt(iw,ih),${PHOTO_EDGE},-2)':'if(gt(iw,ih),-2,${PHOTO_EDGE})':flags=lanczos`,
    '-q:v',
    '4',
    target,
  ])
  console.log(`${name} -> ${path.basename(target)} ${mb(target)}`)
}

const source = path.join(src, VIDEO)
if (process.argv.includes('--photos')) {
  console.log('Tryb --photos, pomijam wideo.')
} else if (!readdirSync(src).includes(VIDEO)) {
  console.log(`Brak ${VIDEO} w media/, pomijam wideo.`)
} else {
  const loop = path.join(out, 'poprzednia-loop.mp4')
  run([
    '-i',
    source,
    '-t',
    String(LOOP_SECONDS),
    '-an',
    '-vf',
    'scale=-2:480,fps=24',
    '-c:v',
    'libx264',
    '-profile:v',
    'main',
    '-crf',
    '30',
    '-preset',
    'medium',
    '-movflags',
    '+faststart',
    loop,
  ])
  console.log(`poprzednia-loop.mp4 ${mb(loop)}`)

  const full = path.join(out, 'poprzednia.mp4')
  run([
    '-i',
    source,
    '-an',
    '-vf',
    'scale=-2:1080',
    '-c:v',
    'libx264',
    '-profile:v',
    'high',
    '-crf',
    '30',
    '-preset',
    'medium',
    '-movflags',
    '+faststart',
    full,
  ])
  console.log(`poprzednia.mp4 ${mb(full)}`)
}
