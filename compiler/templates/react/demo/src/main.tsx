import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { setupNui } from '../../../portable/nui'

setupNui({ palette: 'next', mode: 'light' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
