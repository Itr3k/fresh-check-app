
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

// Add more detailed error logging
console.log("Application initialization started");

// Add error boundary for the entire application
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Prevent the error from being swallowed
  event.preventDefault();
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
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
console.log("Performance mark: app-start");

// Get the root element once to avoid repeated DOM queries
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found in the DOM");
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element (#root) not found</div>';
  throw new Error("Root element not found");
}

// Verify DOM is ready before rendering
console.log("DOM ready, root element found:", rootElement);

// Create the root instance in a try-catch block
let root;
try {
  root = createRoot(rootElement);
  console.log("React root created successfully");
} catch (error) {
  console.error("Failed to create React root:", error);
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to initialize React</div>';
  throw error;
}

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
      
      console.log("Preloading critical images:", validUrls.length);
      
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
            console.log("Critical images preloaded");
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
    const startupPerformance = performance.getEntriesByName('app-startup')[0];
    console.log("App startup performance:", startupPerformance.duration.toFixed(2) + "ms");
  };

  // Create a simple test element to verify rendering capabilities
  const testDiv = document.createElement('div');
  testDiv.id = 'react-test-element';
  testDiv.style.display = 'none';
  document.body.appendChild(testDiv);
  
  try {
    const testRoot = createRoot(testDiv);
    testRoot.render(<div>Test render successful</div>);
    console.log("Test render successful");
    document.body.removeChild(testDiv);
  } catch (testError) {
    console.error("Test render failed:", testError);
  }

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
