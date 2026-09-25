// Wycina otwór z nakładek „Artist announcement” z social toola i zapisuje go jako maskę.
// Nakładka to prostokąt kadru + kontur otworu; zostawiamy sam otwór przycięty do jego krawędzi.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.resolve(root, '..', 'sociale', 'public', 'media', 'Post 1 line')
const out = path.join(root, 'public', 'svg', 'masks')

function cubicExtrema(p0, p1, p2, p3) {
  const a = -p0 + 3 * p1 - 3 * p2 + p3
  const b = 2 * (p0 - 2 * p1 + p2)
  const c = p1 - p0
  const roots = []
  if (Math.abs(a) < 1e-9) {
    if (Math.abs(b) > 1e-9) roots.push(-c / b)
  } else {
    const disc = b * b - 4 * a * c
    if (disc >= 0) {
      const s = Math.sqrt(disc)
      roots.push((-b + s) / (2 * a), (-b - s) / (2 * a))
    }
  }
  return roots
    .filter((t) => t > 0 && t < 1)
    .map((t) => (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3)
}

function bbox(d) {
  const tokens = d.match(/[MCHVZ]|-?\d*\.?\d+(?:e-?\d+)?/gi) ?? []
  let x = 0
  let y = 0
  const xs = []
  const ys = []
  let cmd = ''
  for (let i = 0; i < tokens.length; ) {
    if (/[A-Z]/i.test(tokens[i])) cmd = tokens[i++]
    const n = () => Number(tokens[i++])
    if (cmd === 'M') {
      x = n()
      y = n()
      xs.push(x)
      ys.push(y)
    } else if (cmd === 'H') {
      x = n()
      xs.push(x)
    } else if (cmd === 'V') {
      y = n()
      ys.push(y)
    } else if (cmd === 'C') {
      const [x1, y1, x2, y2, x3, y3] = [n(), n(), n(), n(), n(), n()]
      xs.push(x3, ...cubicExtrema(x, x1, x2, x3))
      ys.push(y3, ...cubicExtrema(y, y1, y2, y3))
      x = x3
      y = y3
    } else if (cmd === 'Z') {
      continue
    } else {
      throw new Error(`Nieobsługiwane polecenie ścieżki: ${cmd}`)
    }
  }
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  return [minX, minY, Math.max(...xs) - minX, Math.max(...ys) - minY].map((v) => +v.toFixed(3))
}

const files = readdirSync(src)
  .filter((name) => name.endsWith('.svg'))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))

files.forEach((name, index) => {
  const svg = readFileSync(path.join(src, name), 'utf8')
  const d = svg.match(/ d="([^"]+)"/)?.[1] ?? ''
  const hole = d.slice(d.indexOf('Z') + 1).trim()
  const [x, y, w, h] = bbox(hole)
  const target = `announcement-${index + 1}.svg`
  writeFileSync(
    path.join(out, target),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="none"><path fill="#fff" d="${hole}"/></svg>\n`,
  )
  console.log(`${name} -> ${target} (${w.toFixed(0)}×${h.toFixed(0)})`)
})
