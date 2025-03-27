
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop.tsx';
import { FOOD_IMAGES } from './components/FoodCard.tsx';

// Add more detailed error logging
console.log("Application initialization started");

// Add error boundary for the entire application
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Log detailed error information
  console.error('Error message:', event.error?.message);
  console.error('Error stack:', event.error?.stack);
  console.error('Error type:', typeof event.error);
  // Don't prevent default to ensure errors are visible
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  console.error('Rejection stack:', event.reason?.stack);
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
  
  // Test render a simple element first to verify React is working
  const TestComponent = () => <div>React test render</div>;
  
  try {
    const testDiv = document.createElement('div');
    testDiv.id = 'react-test-element';
    testDiv.style.display = 'none';
    document.body.appendChild(testDiv);
    
    const testRoot = createRoot(testDiv);
    testRoot.render(<TestComponent />);
    console.log("Test render successful");
    document.body.removeChild(testDiv);
  } catch (testError) {
    console.error("React test render failed:", testError);
    throw new Error(`React test render failed: ${testError instanceof Error ? testError.message : String(testError)}`);
  }
  
  // If test render succeeds, render the actual application
  console.log("Rendering React application now");
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
      window.requestIdleCallback(() => {
        console.log("Executing deferred initialization");
        performance.mark('app-rendered');
        performance.measure('app-startup', 'app-start', 'app-rendered');
      }, { timeout: 1000 });
    } else {
      setTimeout(() => {
        console.log("Executing deferred initialization (setTimeout fallback)");
        performance.mark('app-rendered');
        performance.measure('app-startup', 'app-start', 'app-rendered');
      }, 200);
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
