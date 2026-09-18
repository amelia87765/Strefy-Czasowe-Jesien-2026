import { useEffect, useState } from 'react';

const SIZE = 128;
const SLICES = [-2, -1, 0, 1, 2];

/** Ship stays put and yaws around its vertical midline. */
export default function RotatingLogo() {
  const [face, setFace] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement('canvas');
      canvas.width = SIZE;
      canvas.height = SIZE;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      const scale = Math.min(SIZE / image.naturalWidth, SIZE / image.naturalHeight);
      const w = Math.round(image.naturalWidth * scale);
      const h = Math.round(image.naturalHeight * scale);
      ctx.drawImage(image, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
      const pixels = ctx.getImageData(0, 0, SIZE, SIZE);
      const { data } = pixels;
      for (let i = 0; i < data.length; i += 4) {
        const dark = data[i] <= 12 && data[i + 1] <= 12 && data[i + 2] <= 12;
        if (data[i + 3] <= 127 || dark) {
          data[i + 3] = 0;
          continue;
        }
        for (let c = 0; c < 3; c += 1) data[i + c] = Math.round(data[i + c] / 51) * 51;
        data[i + 3] = 255;
      }
      ctx.putImageData(pixels, 0, 0);
      setFace(canvas.toDataURL());
    };
    image.src = '/assets/logo-pixel.png';
    return () => {
      cancelled = true;
      image.onload = null;
    };
  }, []);

  return (
    <div className="logo-size">
      <div className="logo-spin" aria-hidden="true">
        {(face ? SLICES : [0]).map((z) => (
          <img
            key={z}
            className="logo-slice"
            src={face || '/assets/logo-pixel.png'}
            alt=""
            style={{ transform: `translateZ(${z}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
