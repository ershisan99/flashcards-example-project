import { StrictMode } from 'react'

import { App } from './App'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
