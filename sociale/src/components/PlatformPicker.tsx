import { platforms, type Platform } from '@/data/formats'

type PlatformPickerProps = {
  value: Platform
  onChange: (platform: Platform) => void
}

export function PlatformPicker({ value, onChange }: PlatformPickerProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Platforma">
      {platforms.map((platform) => {
        const selected = platform.id === value.id
        return (
          <button
            key={platform.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selected
                ? 'bg-ink text-white'
                : 'border border-line bg-white text-ink-muted hover:text-ink'
            }`}
            onClick={() => onChange(platform)}
          >
            {platform.name}
          </button>
        )
      })}
    </div>
  )
}
