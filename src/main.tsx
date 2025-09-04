import { StrictMode, lazy, Suspense, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { preloadCriticalResources } from './utils/preloader'

// Lazy load analytics components for better initial load performance
const Analytics = lazy(() => import("@vercel/analytics/react").then(module => ({ default: module.Analytics })))
const SpeedInsights = lazy(() => import("@vercel/speed-insights/react").then(module => ({ default: module.SpeedInsights })))

// Performance optimization: Load analytics only after user interaction
const AnalyticsWrapper = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  
  useEffect(() => {
    const loadAnalytics = () => {
      setShouldLoad(true);
      events.forEach(event => document.removeEventListener(event, loadAnalytics, true));
    };
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => document.addEventListener(event, loadAnalytics, true));
    
    // Fallback after 2 seconds
    const timer = setTimeout(loadAnalytics, 2000);
    
    return () => {
      clearTimeout(timer);
      events.forEach(event => document.removeEventListener(event, loadAnalytics, true));
    };
  }, []);
  
  if (!shouldLoad) return null;
  
  return (
    <Suspense fallback={null}>
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
};

// Preload critical resources
preloadCriticalResources();

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <AnalyticsWrapper />
  </StrictMode>,
)
