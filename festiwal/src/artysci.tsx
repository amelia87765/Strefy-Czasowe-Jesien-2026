import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ArtistsPage from './pages/ArtistsPage.tsx'
import './index.css'

const root = document.getElementById('root')
if (!root) {
  throw new Error('Brak elementu #root')
}

createRoot(root).render(
  <StrictMode>
    <ArtistsPage />
  </StrictMode>,
)
