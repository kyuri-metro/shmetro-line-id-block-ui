import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@umamichi-ui/common-css'
import '@umamichi-ui/common-css/article.css'
import App from './App.tsx'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
