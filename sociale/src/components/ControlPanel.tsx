import {
  CLASSICO,
  GROTESK,
  SHAPE_FILES,
  contentTypes,
  formats,
  overlayFolder,
  palette,
  seasons,
  textAligns,
  textVAligns,
  type ContentType,
  type Format,
  type Season,
  type TextAlign,
  type TextVAlign,
} from '@/data/brand'
import { gridMaskUrl, gridMasks, gridTemplates, type GridId, type GridMaskId } from '@/data/grids'
import { contrastPasses } from '@/lib/contrast'

type ControlPanelProps = {
  season: Season
  format: Format
  showGuides: boolean
  contentType: ContentType
  artistName: string
  description: string
  bodyText: string
  overlayIndex: number
  overlayColor: string
  textColor: string
  textAlign: TextAlign
  textVAlign: TextVAlign
  applyGrain: boolean
  hasPhoto: boolean
  onSeason: (value: Season) => void
  onFormat: (value: Format) => void
  onShowGuides: (value: boolean) => void
  onContentType: (value: ContentType) => void
  onArtistName: (value: string) => void
  onDescription: (value: string) => void
  onBodyText: (value: string) => void
  onOverlayIndex: (value: number) => void
  onOverlayColor: (value: string) => void
  onTextColor: (value: string) => void
  onTextAlign: (value: TextAlign) => void
  onTextVAlign: (value: TextVAlign) => void
  onApplyGrain: (value: boolean) => void
  onPhoto: (file: File) => void
  onClearPhoto: () => void
  gridId: GridId
  gridMaskId: GridMaskId
  gridHeadline: string
  shapeColor: string
  bodyColor: string
  shapeGlow: boolean
  glowColor: string
  showLines: boolean
  linesColor: string
  onGridId: (value: GridId) => void
  onGridMaskId: (value: GridMaskId) => void
  onGridHeadline: (value: string) => void
  onShapeColor: (value: string) => void
  onBodyColor: (value: string) => void
  onShapeGlow: (value: boolean) => void
  onGlowColor: (value: string) => void
  onShowLines: (value: boolean) => void
  onLinesColor: (value: string) => void
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (id: T) => void
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-ink-muted uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              className={`min-h-9 rounded-full px-3 py-2 text-xs font-medium ${
                active ? 'bg-ink text-white' : 'border border-line bg-white text-ink-muted'
              }`}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Swatches({
  label,
  value,
  colors,
  onChange,
}: {
  label: string
  value: string
  colors: string[]
  onChange: (color: string) => void
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-ink-muted uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            title={color}
            aria-label={color}
            className={`h-9 w-9 rounded-full border ${
              value.toUpperCase() === color.toUpperCase()
                ? 'border-ink ring-2 ring-ink/30'
                : 'border-line'
            }`}
            style={{ background: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </fieldset>
  )
}

function PhotoField({
  label,
  hasPhoto,
  onPhoto,
  onClearPhoto,
}: {
  label: string
  hasPhoto: boolean
  onPhoto: (file: File) => void
  onClearPhoto: () => void
}) {
  return (
    <div className="block text-xs">
      <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
        {label}
      </span>
      <input
        key={hasPhoto ? 'photo' : 'empty'}
        className="w-full text-xs"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onPhoto(file)
        }}
      />
      {hasPhoto ? (
        <button
          type="button"
          className="mt-2 min-h-9 text-[11px] font-medium text-ink-muted underline"
          onClick={onClearPhoto}
        >
          Remove photo
        </button>
      ) : null}
    </div>
  )
}

export function ControlPanel(props: ControlPanelProps) {
  const colors = palette(props.season)
  const artist = props.contentType === 'artist'
  const grids = props.contentType === 'grids'
  const shapeFolder = overlayFolder(props.format, 1)
  const largeText = props.contentType !== 'small'
  const contrastBg =
    grids && gridTemplates.find((grid) => grid.id === props.gridId)?.fitMode === 'contained'
      ? props.shapeColor
      : props.overlayColor
  const contrastOk = contrastPasses(props.textColor, contrastBg, largeText)

  return (
    <aside className="flex min-h-0 flex-col gap-5 overflow-y-auto border-b border-line bg-white px-5 py-5 md:h-full md:border-r md:border-b-0">
      <h1 className="font-classico text-lg tracking-tight">Strefy Czasowe</h1>

      <Segmented label="Season" value={props.season} options={seasons} onChange={props.onSeason} />

      <div className="flex flex-col gap-3">
        <Segmented
          label="Dimensions"
          value={props.format}
          options={formats.map(({ id, label }) => ({ id, label }))}
          onChange={props.onFormat}
        />
        <label className="flex min-h-9 items-center gap-2 text-xs text-ink-muted">
          <input
            type="checkbox"
            checked={props.showGuides}
            onChange={(event) => props.onShowGuides(event.target.checked)}
          />
          Show guides
        </label>
      </div>

      <Segmented
        label="Content type"
        value={props.contentType}
        options={contentTypes}
        onChange={props.onContentType}
      />

      {artist ? (
        <>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Artist name
            </span>
            <input
              className="w-full rounded-md border border-line px-3 py-2 text-sm"
              value={props.artistName}
              onChange={(event) => props.onArtistName(event.target.value)}
              spellCheck={false}
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Description
            </span>
            <input
              className="w-full rounded-md border border-line px-3 py-2 text-sm"
              value={props.description}
              onChange={(event) => props.onDescription(event.target.value)}
              spellCheck={false}
            />
          </label>
          <PhotoField
            label="Artist picture"
            hasPhoto={props.hasPhoto}
            onPhoto={props.onPhoto}
            onClearPhoto={props.onClearPhoto}
          />
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Overlay shape
            </legend>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
              {SHAPE_FILES.map((file, index) => (
                <button
                  key={file}
                  type="button"
                  className={`aspect-[4/5] overflow-hidden rounded border ${
                    props.overlayIndex === index ? 'border-ink' : 'border-line'
                  }`}
                  onClick={() => props.onOverlayIndex(index)}
                >
                  <img
                    src={`${shapeFolder}/${file}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </fieldset>
          <Swatches
            label="Overlay color"
            value={props.overlayColor}
            colors={colors}
            onChange={props.onOverlayColor}
          />
        </>
      ) : grids ? (
        <>
          <Segmented
            label="Grid"
            value={props.gridId}
            options={gridTemplates.map(({ id, label }) => ({ id, label }))}
            onChange={props.onGridId}
          />
          <fieldset>
            <legend className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-ink-muted uppercase">
              SVG mask
            </legend>
            <div className="grid grid-cols-5 gap-1.5">
              {gridMasks.map((mask) => (
                <button
                  key={mask.id}
                  type="button"
                  title={mask.label}
                  className={`aspect-square overflow-hidden rounded border bg-[#EFE6D9] ${
                    props.gridMaskId === mask.id ? 'border-ink' : 'border-line'
                  }`}
                  onClick={() => props.onGridMaskId(mask.id)}
                >
                  <img src={gridMaskUrl(mask.id)} alt={mask.label} className="h-full w-full object-contain p-1" />
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Headline
            </span>
            <textarea
              className="h-24 w-full resize-none rounded-md border border-line px-3 py-2 text-sm"
              value={props.gridHeadline}
              onChange={(event) => props.onGridHeadline(event.target.value)}
              spellCheck
            />
          </label>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Body
            </span>
            <textarea
              className="h-28 w-full resize-none rounded-md border border-line px-3 py-2 text-sm"
              value={props.bodyText}
              onChange={(event) => props.onBodyText(event.target.value)}
              spellCheck
            />
          </label>
          <Segmented
            label="Align horizontal"
            value={props.textAlign}
            options={textAligns}
            onChange={props.onTextAlign}
          />
          <Segmented
            label="Align vertical"
            value={props.textVAlign}
            options={textVAligns}
            onChange={props.onTextVAlign}
          />
          <PhotoField
            label="Background photo"
            hasPhoto={props.hasPhoto}
            onPhoto={props.onPhoto}
            onClearPhoto={props.onClearPhoto}
          />
          <Swatches
            label="Background color"
            value={props.overlayColor}
            colors={colors}
            onChange={props.onOverlayColor}
          />
          <Swatches
            label="Shape color"
            value={props.shapeColor}
            colors={colors}
            onChange={props.onShapeColor}
          />
          <Swatches
            label="Headline color"
            value={props.textColor}
            colors={colors}
            onChange={props.onTextColor}
          />
          <Swatches
            label="Body color"
            value={props.bodyColor}
            colors={colors}
            onChange={props.onBodyColor}
          />
          <label className="flex min-h-9 items-center gap-2 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={props.shapeGlow}
              onChange={(event) => props.onShapeGlow(event.target.checked)}
            />
            Shape glow
          </label>
          {props.shapeGlow ? (
            <Swatches
              label="Glow color"
              value={props.glowColor}
              colors={colors}
              onChange={props.onGlowColor}
            />
          ) : null}
          <label className="flex min-h-9 items-center gap-2 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={props.showLines}
              onChange={(event) => props.onShowLines(event.target.checked)}
            />
            Lines
          </label>
          {props.showLines ? (
            <p className="text-[11px] leading-relaxed text-ink-muted">
              Drag the preview to move the lines. They sit under the mask and text.
            </p>
          ) : null}
          {props.showLines ? (
            <Swatches
              label="Lines color"
              value={props.linesColor}
              colors={colors}
              onChange={props.onLinesColor}
            />
          ) : null}
        </>
      ) : (
        <>
          <label className="block text-xs">
            <span className="mb-1.5 block font-semibold tracking-[0.14em] text-ink-muted uppercase">
              Text
            </span>
            <textarea
              className="h-36 w-full resize-none rounded-md border border-line px-3 py-2 text-sm"
              value={props.bodyText}
              onChange={(event) => props.onBodyText(event.target.value)}
              spellCheck
            />
          </label>
          <Segmented
            label="Align horizontal"
            value={props.textAlign}
            options={textAligns}
            onChange={props.onTextAlign}
          />
          <Segmented
            label="Align vertical"
            value={props.textVAlign}
            options={textVAligns}
            onChange={props.onTextVAlign}
          />
          <PhotoField
            label="Background photo"
            hasPhoto={props.hasPhoto}
            onPhoto={props.onPhoto}
            onClearPhoto={props.onClearPhoto}
          />
          <Swatches
            label="Background color"
            value={props.overlayColor}
            colors={colors}
            onChange={props.onOverlayColor}
          />
        </>
      )}

      {grids ? null : (
      <Swatches
        label="Text color"
        value={props.textColor}
        colors={colors}
        onChange={props.onTextColor}
      />
      )}

      <label className="flex min-h-9 items-center gap-2 text-xs text-ink-muted">
        <input
          type="checkbox"
          checked={props.applyGrain}
          onChange={(event) => props.onApplyGrain(event.target.checked)}
        />
        Apply grain
      </label>

      <div className="mt-auto pt-4">
        <p
          className="text-[10px] leading-relaxed text-ink-muted/80"
          style={{ fontFamily: `${CLASSICO}, ${GROTESK}` }}
        >
          Post 1080×1350 · Story 1080×1920
        </p>
        <p
          className={`mt-3 text-xs font-semibold tracking-[0.16em] uppercase ${
            contrastOk ? 'text-[#16A34A]' : 'text-[#DC2626]'
          }`}
        >
          CONTRAST CHECK
        </p>
      </div>
    </aside>
  )
}
