import { useEffect, useState } from 'react';

/** 64-pixel sprite extruded by 5 px. Rear texture matches the front silhouette. */
export default function RotatingLogo() {
  const [sprite, setSprite] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement('canvas');
      canvas.height = 64;
      canvas.width = Math.round(64 * image.naturalWidth / image.naturalHeight);
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0, canvas.width, 64);
      const pixels = ctx.getImageData(0, 0, canvas.width, 64);
      for (let i = 0; i < pixels.data.length; i += 4) {
        for (let c = 0; c < 3; c++) pixels.data[i + c] = Math.round(pixels.data[i + c] / 51) * 51;
        pixels.data[i + 3] = pixels.data[i + 3] > 127 ? 255 : 0;
      }
      ctx.putImageData(pixels, 0, 0);
      const width = canvas.width;
      const opaque = (x, y) => x >= 0 && y >= 0 && x < width && y < 64 && pixels.data[(y * width + x) * 4 + 3] > 0;
      const walls = [];
      const wall = (x, y, vertical) => walls.push({
        width: vertical ? 5 : 1, height: vertical ? 1 : 5,
        left: x - (vertical ? 2.5 : 0), top: y - (vertical ? 0 : 2.5),
        transform: vertical ? 'rotateY(90deg)' : 'rotateX(90deg)',
      });
      for (let y = 0; y < 64; y++) for (let x = 0; x < width; x++) if (opaque(x, y)) {
        if (!opaque(x - 1, y)) wall(x, y, true);
        if (!opaque(x + 1, y)) wall(x + 1, y, true);
        if (!opaque(x, y - 1)) wall(x, y, false);
        if (!opaque(x, y + 1)) wall(x, y + 1, false);
      }
      const rear = document.createElement('canvas');
      rear.width = width; rear.height = 64;
      const back = rear.getContext('2d');
      back.imageSmoothingEnabled = false;
      back.translate(width, 0); back.scale(-1, 1); back.drawImage(canvas, 0, 0);
      setSprite({ width, walls, front: canvas.toDataURL(), rear: rear.toDataURL() });
    };
    image.src = '/assets/logo-pixel.png';
    return () => { cancelled = true; image.onload = null; };
  }, []);
  return <div className="logo-size"><div className="scene" aria-hidden="true">
    <div className="logo" style={{ width: sprite?.width ?? 46 }}>
      {sprite ? <>
        {sprite.walls.map((style, index) => <div key={index} className="wall" style={style} />)}
        <img className="layer face" src={sprite.front} alt="" style={{ transform: 'translateZ(2.5px)' }} />
        <img className="layer face" src={sprite.rear} alt="" style={{ transform: 'translateZ(-2.5px) rotateY(180deg)' }} />
      </> : <img className="layer" src="/assets/logo-pixel.png" alt="" />}
    </div>
  </div></div>;
}
