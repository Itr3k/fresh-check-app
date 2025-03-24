
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const rootElement = document.getElementById("root");

const renderApp = async () => {
  if (!rootElement) return;
  
  const root = createRoot(rootElement);
  
  // Start performance measurement
  performance.mark('react-app-start');
  
  root.render(
    <>
      <App />
      <Analytics />
      <SpeedInsights />
    </>
  );
  
  // End performance measurement
  performance.mark('react-app-end');
  performance.measure('React App Render', 'react-app-start', 'react-app-end');
  
  // Log performance in development only
  if (import.meta.env.DEV) {
    const measure = performance.getEntriesByName('React App Render')[0];
    console.log(`App rendered in ${measure.duration.toFixed(2)}ms`);
  }
};

// Add resource hints during page load
const addResourceHints = () => {
  ['https://pagead2.googlesyndication.com', 'https://www.googletagmanager.com'].forEach(url => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
  
  if (window.location.pathname === '/') {
    const heroImage = document.querySelector('.hero-image') as HTMLImageElement;
    if (heroImage?.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(addResourceHints);
} else {
  setTimeout(addResourceHints, 200);
}

// Add performance observer for Core Web Vitals
if ('PerformanceObserver' in window) {
  try {
    // Create CLS observer
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if ((entry as any).hadRecentInput) continue;
        if (import.meta.env.DEV) {
          console.log('CLS:', entry);
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Create LCP observer
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (import.meta.env.DEV) {
        console.log('LCP:', lastEntry.startTime.toFixed(1), 'ms');
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Add FID observer
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (import.meta.env.DEV) {
          console.log('FID:', entry);
        }
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Add INP observer safely
    if ('interactionCount' in PerformanceObserver.supportedEntryTypes) {
      const inpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0 && import.meta.env.DEV) {
          console.log('INP:', entries);
        }
      });
      inpObserver.observe({ type: 'event', buffered: true });
    }
  } catch (e) {
    console.error('Performance observer error:', e);
  }
}

// Immediately render the app
renderApp();
