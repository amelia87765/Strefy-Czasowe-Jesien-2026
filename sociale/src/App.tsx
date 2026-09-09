import { FormatCard } from '@/components/FormatCard'
import { PlatformPicker } from '@/components/PlatformPicker'
import { formatKinds, platforms } from '@/data/formats'
import { useState } from 'react'

const initialPlatform = platforms[0]
if (!initialPlatform) {
  throw new Error('Brak zdefiniowanych platform.')
}

function App() {
  const [platform, setPlatform] = useState(initialPlatform)

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Narzędzie wewnętrzne
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Strefy Czasowe Sociale
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          Wybierz platformę. Post, rolka i relacja mają podane wymiary w pikselach.
          Szablon PNG schodzi 1:1 (np. 1080×1920), bez skalowania.
        </p>
      </header>

      <div className="mt-8">
        <PlatformPicker value={platform} onChange={setPlatform} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {formatKinds.map((kind) => (
          <FormatCard
            key={`${platform.id}-${kind}`}
            platformId={platform.id}
            platformName={platform.name}
            kind={kind}
            sizes={platform.formats[kind]}
          />
        ))}
      </div>
    </div>
  )
}

export default App
