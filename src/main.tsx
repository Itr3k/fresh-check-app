
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
};

// Immediately render our app
renderApp();

// Preconnect to any third-party domains
const preconnectLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com'
];

// Add preconnect links dynamically
preconnectLinks.forEach(url => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    // Register any non-critical observers or analytics here
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        const lcpEntry = list.getEntries().at(-1);
        if (lcpEntry && import.meta.env.DEV) {
          console.log('LCP:', lcpEntry.startTime.toFixed(1), 'ms');
        }
      });
      
      perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(() => {
    // Non-critical initialization here
  }, 1);
}
