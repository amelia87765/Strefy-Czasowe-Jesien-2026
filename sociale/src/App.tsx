import { ControlPanel } from '@/components/ControlPanel'
import { PreviewStage } from '@/components/PreviewStage'
import { palette, type ContentType, type Format, type Season, type TextAlign, type TextVAlign } from '@/data/brand'
import { getGrid, type GridId } from '@/data/grids'
import { artistShapeFiles, gradientUrl, gridShapeFiles, keepShape, linesShapeFiles } from '@/data/shapes'
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
  const [overlayFile, setOverlayFile] = useState('')
  const [overlayColor, setOverlayColor] = useState('#FF562C')
  const [textColor, setTextColor] = useState('#2E202C')
  const [textAlign, setTextAlign] = useState<TextAlign>('center')
  const [textVAlign, setTextVAlign] = useState<TextVAlign>('center')
  const applyGrain = true
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null)
  const [scale, setScale] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [gridId, setGridId] = useState<GridId>('central-mask')
  const [gridMaskFile, setGridMaskFile] = useState('')
  const [textShapeFile, setTextShapeFile] = useState('')
  const [gridHeadline, setGridHeadline] = useState('')
  const [shapeColor, setShapeColor] = useState('#3E2D14')
  const [bodyColor, setBodyColor] = useState('#CCC12C')
  const [shapeGlow, setShapeGlow] = useState(false)
  const [glowColor, setGlowColor] = useState('#FF562C')
  const [showLines, setShowLines] = useState(false)
  const [linesColor, setLinesColor] = useState('#FF562C')
  const [linesPanX, setLinesPanX] = useState(0)
  const [linesPanY, setLinesPanY] = useState(0)
  const [typeSizeFactor, setTypeSizeFactor] = useState(1)
  const [linesFile, setLinesFile] = useState('')
  const [gradientFile, setGradientFile] = useState('')
  const [gradient, setGradient] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    void document.fonts.load('140px "URW Classico"')
    void document.fonts.load('50px "Akzidenz-Grotesk Next"')
    void document.fonts.load('90px "URW Classico"')
    void document.fonts.load('italic 90px "URW Palladio"')
    void document.fonts.load('40px "Hanken Grotesk"')
    void document.fonts.load('700 40px "Hanken Grotesk"')
  }, [])

  const overlayFileSafe = keepShape(overlayFile, artistShapeFiles(format, 1))
  const gridMaskFileSafe = keepShape(gridMaskFile, gridShapeFiles())
  const linesFileSafe = keepShape(linesFile, linesShapeFiles())

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
        overlayFile={overlayFileSafe}
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
        onOverlayFile={setOverlayFile}
        onOverlayColor={setOverlayColor}
        onTextColor={setTextColor}
        onTextAlign={setTextAlign}
        onTextVAlign={setTextVAlign}
        onPhoto={(file) => {
          const url = URL.createObjectURL(file)
          void loadImage(url).then((image) => {
            setPhoto(image)
            setGradient(null)
            setGradientFile('')
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
        gridMaskFile={gridMaskFileSafe}
        textShapeFile={textShapeFile}
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
        onGridMaskFile={setGridMaskFile}
        onTextShapeFile={setTextShapeFile}
        onGridHeadline={setGridHeadline}
        onShapeColor={setShapeColor}
        onBodyColor={setBodyColor}
        onShapeGlow={setShapeGlow}
        onGlowColor={setGlowColor}
        onShowLines={setShowLines}
        onLinesColor={setLinesColor}
        typeSizeFactor={typeSizeFactor}
        onTypeSizeFactor={setTypeSizeFactor}
        linesFile={linesFileSafe}
        onLinesFile={setLinesFile}
        gradientFile={gradientFile}
        onGradientFile={(file) => {
          setGradientFile(file)
          if (!file) {
            setGradient(null)
            return
          }
          void loadImage(gradientUrl(file)).then((image) => {
            setGradient(image)
            setPhoto(null)
            setScale(1)
            setPanX(0)
            setPanY(0)
          })
        }}
      />
      <PreviewStage
        format={format}
        contentType={contentType}
        artistName={artistName}
        description={description}
        bodyText={bodyText}
        overlayFile={overlayFileSafe}
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
        gridMaskFile={gridMaskFileSafe}
        textShapeFile={textShapeFile}
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
        typeSizeFactor={typeSizeFactor}
        linesFile={linesFileSafe}
        gradient={gradient}
      />
    </div>
  )
}

export default App
