export function LineField() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}lines.svg`}
      alt=""
      aria-hidden
      draggable={false}
      decoding="async"
      className="line-field pointer-events-none absolute inset-0 h-full w-full select-none"
    />
  )
}
