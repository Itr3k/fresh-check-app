
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from './components/ScrollToTop.tsx'
import { handleError } from './lib/errorUtils'
import { registerServiceWorker, getEnvironmentName } from './lib/serviceWorkerUtils'

// Log app initialization for debugging with environment info
const environment = getEnvironmentName();
console.log(`Initializing application in ${environment} environment...`);

// Store environment in window for debugging
window.appEnvironment = environment;
window.appVersion = import.meta.env.VITE_APP_VERSION || '0.0.0';

// Function to hide loader manually if event listener fails
const hideLoader = () => {
  const loader = document.getElementById('loading-indicator')
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
}

// Function to show error UI
const showErrorUI = (errorMessage?: string) => {
  const appError = document.getElementById('app-error');
  if (appError) {
    // Add specific error message if provided
    if (errorMessage) {
      const errorMessageElement = document.createElement('p');
      errorMessageElement.className = 'error-details';
      errorMessageElement.textContent = errorMessage;
      errorMessageElement.style.fontSize = '14px';
      errorMessageElement.style.color = '#666';
      errorMessageElement.style.margin = '10px 0';
      appError.appendChild(errorMessageElement);
    }
    
    appError.classList.remove('hidden');
  }
  hideLoader();
}

// Get the root element - critical for application to load
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error(`Root element not found in ${environment} - critical error`);
  // Add visible error message in case console isn't checked
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Failed to initialize: Root element not found</div>';
  throw new Error("Root element not found");
}

// Create root once
const root = createRoot(rootElement);

// Register service worker - but only in production
if (environment === 'production') {
  window.addEventListener('load', () => {
    registerServiceWorker().catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
} else {
  console.log(`Service worker disabled in ${environment} environment`);
}

// Render with error handling
try {
  console.log(`Rendering application in ${environment}...`);
  
  // Create a global error handler for uncaught errors
  window.addEventListener('error', (event) => {
    console.error(`Global error caught in ${environment}:`, event.error);
    handleError(event.error, 'window-onerror');
    
    // Only show error UI if app hasn't loaded yet
    if (!window.appLoaded) {
      showErrorUI(event.error?.message || 'Uncaught error during application startup');
    }
    
    // Track error in analytics if available
    if (window.gtag) {
      window.gtag('event', 'error', {
        event_category: 'Global Error',
        event_label: event.error?.message || 'Unknown error',
        non_interaction: true,
        environment: environment
      });
    }
  });
  
  // Also handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error(`Unhandled Promise rejection in ${environment}:`, event.reason);
    handleError(event.reason, 'unhandled-promise');
    
    // Only show error UI if app hasn't loaded yet
    if (!window.appLoaded) {
      showErrorUI(event.reason?.message || 'Unhandled promise rejection during application startup');
    }
    
    // Track error in analytics if available
    if (window.gtag) {
      window.gtag('event', 'error', {
        event_category: 'Unhandled Promise',
        event_label: event.reason?.message || 'Unknown promise error',
        non_interaction: true,
        environment: environment
      });
    }
  });
  
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <HelmetProvider>
          <App />
          <Analytics debug={environment !== 'production'} />
          <SpeedInsights debug={environment !== 'production'} />
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
  
  // App rendered successfully, hide loader after a short delay
  setTimeout(hideLoader, 500);
} catch (error) {
  console.error(`Critical render error in ${environment}:`, error);
  handleError(error, 'root-render');
  showErrorUI(`Failed to render application: ${(error as Error)?.message || 'Unknown error'}`);
  
  // Fallback render with minimal components
  try {
    root.render(
      <div className="p-8 max-w-md mx-auto my-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-red-600 mb-4">
          Application failed to load
        </h2>
        <p className="text-gray-700 mb-4">
          There was a problem loading the application in the {environment} environment. Please try refreshing the page.
        </p>
        <div className="text-sm text-gray-500 mb-4">
          Error details: {(error as Error)?.message || 'Unknown error'}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Refresh Page
        </button>
      </div>
    );
  } catch (fallbackError) {
    console.error(`Even fallback rendering failed in ${environment}:`, fallbackError);
    document.body.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h2 style="color: #e53e3e; margin-bottom: 1rem;">Critical Error</h2>
        <p style="margin-bottom: 1rem;">The application failed to load in the ${environment} environment. Please try refreshing the page.</p>
        <div style="font-size: 12px; color: #666; margin-bottom: 1rem;">
          Error details: ${(error as Error)?.message || 'Unknown error'}
        </div>
        <button onclick="window.location.reload()" style="background: #3182ce; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">
          Refresh Page
        </button>
      </div>
    `;
  }
}
