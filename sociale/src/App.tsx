import { ControlPanel } from '@/components/ControlPanel'
import { PreviewStage } from '@/components/PreviewStage'
import { palette, type ContentType, type Format, type Season, type TextAlign, type TextVAlign } from '@/data/brand'
import { getGrid, type GridId, type GridMaskId } from '@/data/grids'
import { loadImage } from '@/lib/overlays'
import { useEffect, useState } from 'react'

function keepOrFallback(current: string, next: string[], fallback: string): string {
  const match = next.find((color) => color.toUpperCase() === current.toUpperCase())
  return match ?? fallback
}

function App() {
  const [season, setSeason] = useState<Season>('winter')
  const [format, setFormat] = useState<Format>('post')
  const [showGuides, setShowGuides] = useState(false)
  const [contentType, setContentType] = useState<ContentType>('artist')
  const [artistName, setArtistName] = useState('')
  const [description, setDescription] = useState('')
  const [bodyText, setBodyText] = useState('')
  const [overlayIndex, setOverlayIndex] = useState(0)
  const [overlayColor, setOverlayColor] = useState('#FF562C')
  const [textColor, setTextColor] = useState('#2E202C')
  const [textAlign, setTextAlign] = useState<TextAlign>('center')
  const [textVAlign, setTextVAlign] = useState<TextVAlign>('center')
  const [applyGrain, setApplyGrain] = useState(false)
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null)
  const [scale, setScale] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [gridId, setGridId] = useState<GridId>('central-mask')
  const [gridMaskId, setGridMaskId] = useState<GridMaskId>('triple-oval')
  const [gridHeadline, setGridHeadline] = useState('')
  const [shapeColor, setShapeColor] = useState('#3E2D14')
  const [bodyColor, setBodyColor] = useState('#CCC12C')
  const [shapeGlow, setShapeGlow] = useState(true)
  const [glowColor, setGlowColor] = useState('#FF562C')
  const [showLines, setShowLines] = useState(true)
  const [linesColor, setLinesColor] = useState('#FF562C')
  const [linesPanX, setLinesPanX] = useState(0)
  const [linesPanY, setLinesPanY] = useState(0)

  useEffect(() => {
    void document.fonts.load('140px "URW Classico"')
    void document.fonts.load('50px "Akzidenz-Grotesk Next"')
  }, [])

  return (
    <div className="flex min-h-svh flex-col overflow-auto md:grid md:h-svh md:grid-cols-[minmax(260px,40%)_1fr] md:overflow-hidden">
      <ControlPanel
        season={season}
        format={format}
        showGuides={showGuides}
        contentType={contentType}
        artistName={artistName}
        description={description}
        bodyText={bodyText}
        overlayIndex={overlayIndex}
        overlayColor={overlayColor}
        textColor={textColor}
        textAlign={textAlign}
        textVAlign={textVAlign}
        applyGrain={applyGrain}
        hasPhoto={photo !== null}
        onSeason={(value) => {
          setSeason(value)
          const next = palette(value)
          setOverlayColor((current) => keepOrFallback(current, next, next[0] ?? '#FF562C'))
          setTextColor((current) => keepOrFallback(current, next, '#2E202C'))
          setShapeColor((current) => keepOrFallback(current, next, '#3E2D14'))
          setBodyColor((current) => keepOrFallback(current, next, '#CCC12C'))
          setGlowColor((current) => keepOrFallback(current, next, next[0] ?? '#FF562C'))
          setLinesColor((current) => keepOrFallback(current, next, next[0] ?? '#FF562C'))
        }}
        onFormat={setFormat}
        onShowGuides={setShowGuides}
        onContentType={setContentType}
        onArtistName={setArtistName}
        onDescription={setDescription}
        onBodyText={setBodyText}
        onOverlayIndex={setOverlayIndex}
        onOverlayColor={setOverlayColor}
        onTextColor={setTextColor}
        onTextAlign={setTextAlign}
        onTextVAlign={setTextVAlign}
        onApplyGrain={setApplyGrain}
        onPhoto={(file) => {
          const url = URL.createObjectURL(file)
          void loadImage(url).then((image) => {
            setPhoto(image)
            setScale(1)
            setPanX(0)
            setPanY(0)
          })
        }}
        onClearPhoto={() => {
          setPhoto(null)
          setScale(1)
          setPanX(0)
          setPanY(0)
        }}
        gridId={gridId}
        gridMaskId={gridMaskId}
        gridHeadline={gridHeadline}
        shapeColor={shapeColor}
        bodyColor={bodyColor}
        shapeGlow={shapeGlow}
        glowColor={glowColor}
        showLines={showLines}
        linesColor={linesColor}
        onGridId={(value) => {
          setGridId(value)
          const grid = getGrid(value)
          setTextAlign(grid.defaultAlign)
          setTextVAlign(grid.defaultVAlign)
        }}
        onGridMaskId={setGridMaskId}
        onGridHeadline={setGridHeadline}
        onShapeColor={setShapeColor}
        onBodyColor={setBodyColor}
        onShapeGlow={setShapeGlow}
        onGlowColor={setGlowColor}
        onShowLines={setShowLines}
        onLinesColor={setLinesColor}
      />
      <PreviewStage
        format={format}
        contentType={contentType}
        artistName={artistName}
        description={description}
        bodyText={bodyText}
        overlayIndex={overlayIndex}
        overlayColor={overlayColor}
        textColor={textColor}
        textAlign={textAlign}
        textVAlign={textVAlign}
        applyGrain={applyGrain}
        showGuides={showGuides}
        photo={photo}
        scale={scale}
        panX={panX}
        panY={panY}
        onPan={(x, y) => {
          setPanX(x)
          setPanY(y)
        }}
        onScale={setScale}
        gridId={gridId}
        gridMaskId={gridMaskId}
        gridHeadline={gridHeadline}
        shapeColor={shapeColor}
        bodyColor={bodyColor}
        shapeGlow={shapeGlow}
        glowColor={glowColor}
        showLines={showLines}
        linesColor={linesColor}
        linesPanX={linesPanX}
        linesPanY={linesPanY}
        onLinesPan={(x, y) => {
          setLinesPanX(x)
          setLinesPanY(y)
        }}
      />
    </div>
  )
}

export default App
