const LINE_X = [
  9.6, 11.22, 16.08, 22.13, 24.05, 25.56, 32.05, 37.74, 40.38, 41.84, 49.69, 53.77, 57.78, 60.27,
  66.3, 69.55, 74.09, 78.42, 82.97, 89.64, 97.27,
]

export function LineField() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {LINE_X.map((x) => (
        <line
          key={x}
          x1={x}
          y1="0"
          x2={x}
          y2="100"
          stroke="#6C665B"
          strokeWidth="0.12"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
