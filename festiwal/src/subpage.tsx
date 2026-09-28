import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Blocks } from './components/Blocks.tsx'
import { SubPage } from './components/SubPage.tsx'
import { FAQ_SECTIONS } from './data/faq.ts'
import {
  ABOUT_SECTIONS,
  SHOP_SECTIONS,
  SUBPAGE_COLORS,
  VOLUNTEERS_SECTIONS,
  type Section,
  type SubpageId,
} from './data/pages.ts'
import './index.css'
import './lib/viewport.ts'

const SECTIONS: Record<SubpageId, Section[]> = {
  'o-festiwalu': ABOUT_SECTIONS,
  sklep: SHOP_SECTIONS,
  wolontariusze: VOLUNTEERS_SECTIONS,
  faq: FAQ_SECTIONS,
}

const root = document.getElementById('root')
const id = document.body.dataset.page as SubpageId | undefined
if (!root || !id || !(id in SUBPAGE_COLORS)) {
  throw new Error('Brak elementu #root lub atrybutu data-page')
}
const sections = SECTIONS[id]

createRoot(root).render(
  <StrictMode>
    <SubPage id={id}>{(lang) => <Blocks sections={sections} lang={lang} />}</SubPage>
  </StrictMode>,
)
