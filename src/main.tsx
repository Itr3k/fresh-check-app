
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from './components/ScrollToTop.tsx'

// Performance monitoring
if (process.env.NODE_ENV === 'development') {
  const reportWebVitals = (metric: any) => {
    console.log(metric);
  };
  
  // @ts-ignore - Making window.__reportWebVitals available for development
  window.__reportWebVitals = reportWebVitals;
}

// Add performance marks for debugging
performance.mark('app-start');

// Get the root element once to avoid repeated DOM queries
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

// Defer non-critical initialization
const deferredInit = () => {
  // Measure initial render performance
  performance.mark('app-rendered');
  performance.measure('app-startup', 'app-start', 'app-rendered');
};

// Render the app first, then perform deferred operations
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <HelmetProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Schedule non-critical operations after initial render
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(deferredInit, { timeout: 1000 });
  } else {
    setTimeout(deferredInit, 200);
  }
}
