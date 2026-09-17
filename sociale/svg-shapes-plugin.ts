import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'

export const SVG_SHAPES_ID = 'virtual:svg-shapes'
const RESOLVED_ID = `\0${SVG_SHAPES_ID}`

type OverlayKey = 'post-1' | 'post-2' | 'story-1' | 'story-2'

function svgSort(a: string, b: string): number {
  const stem = (name: string) => name.replace(/\.svg$/i, '')
  const parts = (name: string): [string, number] => {
    const base = stem(name)
    const match = base.match(/^(.*?)(?:-(\d+))$/)
    if (match) return [match[1] ?? base, Number(match[2])]
    return [base, 0]
  }
  const [aBase, aNum] = parts(a)
  const [bBase, bNum] = parts(b)
  const byName = aBase.localeCompare(bBase, undefined, { numeric: true, sensitivity: 'base' })
  if (byName !== 0) return byName
  return aNum - bNum
}

const ASSET_EXT = /\.(svg|png|jpe?g|webp)$/i

function listAssets(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && ASSET_EXT.test(entry.name))
    .map((entry) => entry.name)
    .sort(svgSort)
}

function listSvgs(dir: string): string[] {
  return listAssets(dir).filter((name) => name.toLowerCase().endsWith('.svg'))
}

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true })
}

export function svgShapesPlugin(root: string): Plugin {
  const dirs = {
    grids: path.join(root, 'public/shapes/grids'),
    text: path.join(root, 'public/shapes/text'),
    lines: path.join(root, 'public/shapes/lines'),
    gradients: path.join(root, 'public/shapes/gradients'),
    overlays: {
      'post-1': path.join(root, 'public/media/Post 1 line'),
      'post-2': path.join(root, 'public/media/Post 2 lines'),
      'story-1': path.join(root, 'public/media/Story 1 line'),
      'story-2': path.join(root, 'public/media/Story 2 lines'),
    } satisfies Record<OverlayKey, string>,
  }

  const watched = [dirs.grids, dirs.text, dirs.lines, dirs.gradients, ...Object.values(dirs.overlays)]

  function snapshot() {
    for (const dir of watched) ensureDir(dir)
    return {
      grids: listSvgs(dirs.grids),
      text: listSvgs(dirs.text),
      lines: listSvgs(dirs.lines),
      gradients: listAssets(dirs.gradients),
      overlays: {
        'post-1': listSvgs(dirs.overlays['post-1']),
        'post-2': listSvgs(dirs.overlays['post-2']),
        'story-1': listSvgs(dirs.overlays['story-1']),
        'story-2': listSvgs(dirs.overlays['story-2']),
      },
    }
  }

  function moduleSource() {
    return `export const svgShapes = ${JSON.stringify(snapshot())}`
  }

  return {
    name: 'svg-shapes-manifest',
    resolveId(id) {
      if (id === SVG_SHAPES_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      return moduleSource()
    },
    configureServer(server: ViteDevServer) {
      for (const dir of watched) {
        ensureDir(dir)
        server.watcher.add(dir)
      }
      const inWatchedDir = (file: string) => {
        const resolved = path.resolve(file)
        return watched.some((dir) => {
          const root = path.resolve(dir)
          return resolved === root || resolved.startsWith(root + path.sep)
        })
      }
      const refresh = (file: string) => {
        if (!ASSET_EXT.test(file) || !inWatchedDir(file)) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (!mod) return
        void server.reloadModule(mod)
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}
