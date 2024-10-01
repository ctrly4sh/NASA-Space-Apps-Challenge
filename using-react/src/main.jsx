import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StarsBackground from './components/StarsBackground.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarsBackground/>
  </StrictMode>,
)
