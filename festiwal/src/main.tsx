import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/viewport.ts'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Brak elementu #root')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
