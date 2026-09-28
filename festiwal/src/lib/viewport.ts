function syncVw() {
  document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`)
}

syncVw()
window.addEventListener('resize', syncVw)
window.addEventListener('orientationchange', syncVw)
