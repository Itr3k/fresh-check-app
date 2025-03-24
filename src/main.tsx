
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create a root for rendering
const rootElement = document.getElementById("root");

// Use promise to capture initial render time for analytics
const renderApp = async () => {
  if (!rootElement) return;
  
  // Create React root
  const root = createRoot(rootElement);
  
  // Start performance measurement
  performance.mark('react-app-start');
  
  // Render the app
  root.render(<App />);
  
  // End performance measurement
  performance.mark('react-app-end');
  performance.measure('React App Render', 'react-app-start', 'react-app-end');
  
  // Log performance in development only
  if (import.meta.env.DEV) {
    const measure = performance.getEntriesByName('React App Render')[0];
    console.log(`App rendered in ${measure.duration.toFixed(2)}ms`);
  }
  
  // Register performance observer for Cumulative Layout Shift
  if ('PerformanceObserver' in window) {
    try {
      // Create CLS observer
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.hadRecentInput) continue;
          if (import.meta.env.DEV) {
            console.log('CLS:', entry);
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Create LCP observer to track largest contentful paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (import.meta.env.DEV) {
          console.log('LCP:', lastEntry.startTime.toFixed(1), 'ms');
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('Performance observer error:', e);
    }
  }
};

// Define critical preconnect URLs
const criticalPreconnects = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com'
];

// Add preconnect for critical domains right away
criticalPreconnects.forEach(url => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Immediately render our app
renderApp();

// Add less critical resource hints during idle time
const addResourceHints = () => {
  // DNS prefetch for ad domains
  ['https://pagead2.googlesyndication.com', 'https://www.googletagmanager.com'].forEach(url => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Preload hero image if on homepage
  if (window.location.pathname === '/') {
    const heroImage = document.querySelector('.hero-image') as HTMLImageElement;
    if (heroImage && heroImage.src) {
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
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(addResourceHints, 200);
}
