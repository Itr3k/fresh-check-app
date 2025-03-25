
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

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Add performance marks for debugging
performance.mark('app-start');

const root = createRoot(rootElement);

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

// Measure initial render performance
performance.mark('app-rendered');
performance.measure('app-startup', 'app-start', 'app-rendered');

// Preload critical images after initial render
const preloadCriticalImages = () => {
  const criticalImageUrls = [
    FOOD_IMAGES.chicken,
    FOOD_IMAGES.milk,
    FOOD_IMAGES.eggs,
    FOOD_IMAGES.bread,
    FOOD_IMAGES.default
  ];
  
  // Use Intersection Observer to detect when we should preload images
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      criticalImageUrls.forEach(url => {
        if (url && url.startsWith('http')) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          document.head.appendChild(link);
        }
      });
      observer.disconnect();
    }
  });
  
  // Observe the root element to start preloading when app is visible
  observer.observe(rootElement);
};

// Start preloading after initial render is complete
setTimeout(preloadCriticalImages, 100);
