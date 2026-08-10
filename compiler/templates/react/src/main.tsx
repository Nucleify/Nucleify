import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'nucleify-ui/styles/variables.css'
import 'nucleify-ui/styles/global.css'
import 'nucleify-ui/components/nui-button'
import 'nucleify-ui/components/nui-icon'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
