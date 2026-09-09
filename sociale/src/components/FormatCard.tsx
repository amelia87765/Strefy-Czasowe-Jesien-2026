import { downloadPngTemplate, copyText } from '@/lib/exportPng'
import { pixelLabel, ratioLabel, slugSize } from '@/lib/measure'
import type { FormatKind, SizeSpec } from '@/data/formats'
import { formatKindLabel } from '@/data/formats'
import { useState } from 'react'

type FormatCardProps = {
  platformId: string
  platformName: string
  kind: FormatKind
  sizes: SizeSpec[] | null
}

export function FormatCard({ platformId, platformName, kind, sizes }: FormatCardProps) {
  const recommended = sizes?.find((item) => item.recommended) ?? sizes?.[0]
  const [active, setActive] = useState<SizeSpec | undefined>(recommended)
  const selected = sizes?.find((item) => item === active) ?? recommended

  if (!sizes || !selected) {
    return (
      <article className="flex min-h-72 flex-col rounded-2xl border border-line bg-white/60 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-ink-muted uppercase">
          {formatKindLabel[kind]}
        </h2>
        <p className="mt-6 text-sm text-ink-muted">Ten format tu nie występuje.</p>
      </article>
    )
  }

  const title = `${platformName} · ${formatKindLabel[kind]} · ${selected.label}`

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-ink uppercase">
          {formatKindLabel[kind]}
        </h2>
        <p className="font-mono text-sm tabular-nums text-ink">
          {pixelLabel(selected.width, selected.height)}
        </p>
      </div>
      <p className="mt-1 text-xs text-ink-muted">
        {selected.label} · CSS {ratioLabel(selected.width, selected.height)}
      </p>

      {sizes.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sizes.map((size) => {
            const isActive = size.width === selected.width && size.height === selected.height && size.label === selected.label
            return (
              <button
                key={`${size.width}x${size.height}-${size.label}`}
                type="button"
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  isActive ? 'bg-ink text-white' : 'bg-sand text-ink-muted hover:text-ink'
                }`}
                onClick={() => setActive(size)}
              >
                {size.label}
                {size.recommended ? ' · polecany' : ''}
              </button>
            )
          })}
        </div>
      ) : null}

      <div className="mt-5 flex min-h-52 flex-1 items-center justify-center rounded-xl bg-paper">
        <div
          className="bg-ink outline outline-2 outline-accent"
          style={{
            width: 'min(100%, 220px)',
            aspectRatio: `${selected.width} / ${selected.height}`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-full bg-accent px-3.5 py-2 text-xs font-medium text-white hover:bg-accent-dark"
          onClick={() =>
            downloadPngTemplate({
              width: selected.width,
              height: selected.height,
              filename: slugSize(platformId, kind, selected.width, selected.height),
              title,
            })
          }
        >
          Pobierz PNG {pixelLabel(selected.width, selected.height)}
        </button>
        <button
          type="button"
          className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink hover:border-ink/20"
          onClick={() => {
            void copyText(`${selected.width}x${selected.height}`).catch(() => {
              window.prompt('Skopiuj wymiary:', `${selected.width}x${selected.height}`)
            })
          }}
        >
          Kopiuj wymiary
        </button>
      </div>
    </article>
  )
}
