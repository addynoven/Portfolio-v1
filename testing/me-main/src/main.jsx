import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import Background from './components/Background.jsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <BrowserRouter>
    <LandingPage>
      <Background>
        <App/>
      </Background>
    </LandingPage>
    </BrowserRouter>
  </StrictMode>,
)
