import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import GoogleAnalytics from './components/GoogleAnalytics'
import PerformanceMonitor from './components/PerformanceMonitor'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
    <GoogleAnalytics trackingId="G-XXXXXXXXXX" />
    <PerformanceMonitor />
  </StrictMode>,
)
