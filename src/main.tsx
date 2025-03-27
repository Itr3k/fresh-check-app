
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from './components/ScrollToTop.tsx'
import { FOOD_IMAGES } from './components/FoodCard.tsx'

// Add error boundary for the entire application
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Prevent the error from being swallowed
  event.preventDefault();
});

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
  console.error("Root element not found in the DOM");
  throw new Error("Root element not found");
}

// Verify DOM is ready before rendering
console.log("DOM ready, root element found:", rootElement);

const root = createRoot(rootElement);

// Render with error handling
try {
  console.log("Attempting to render React application");
  
  // Defer non-critical initialization
  const deferredInit = () => {
    // Preload critical images after initial render in background
    const preloadCriticalImages = () => {
      const criticalImageUrls = [
        FOOD_IMAGES.chicken,
        FOOD_IMAGES.milk,
        FOOD_IMAGES.eggs,
        FOOD_IMAGES.bread,
        FOOD_IMAGES.default
      ];
      
      // Filter out any undefined or non-string URLs
      const validUrls = criticalImageUrls.filter(url => typeof url === 'string' && url.startsWith('http'));
      
      // Use requestIdleCallback to preload images when browser is idle
      const preloader = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      
      preloader(() => {
        // Use Intersection Observer to detect when we should preload images
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            validUrls.forEach(url => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = url;
              document.head.appendChild(link);
            });
            observer.disconnect();
          }
        });
        
        // Observe the root element to start preloading when app is visible
        if (rootElement) {
          observer.observe(rootElement);
        }
      });
    };

    // Start preloading after initial render is complete
    preloadCriticalImages();
    
    // Measure initial render performance
    performance.mark('app-rendered');
    performance.measure('app-startup', 'app-start', 'app-rendered');
  };

  // Render the app first, then perform deferred operations
  console.log("Rendering React application");
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

  console.log("React rendering complete");

  // Schedule non-critical operations after initial render
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(deferredInit, { timeout: 1000 });
    } else {
      setTimeout(deferredInit, 200);
    }
  }
} catch (error) {
  console.error("Fatal render error:", error);
  // Display a fallback UI
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h2>Something went wrong</h2>
        <p>The application failed to load. Please try refreshing the page.</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; text-align: left; overflow: auto;">${
          error instanceof Error ? error.message : String(error)
        }</pre>
      </div>
    `;
  }
}
