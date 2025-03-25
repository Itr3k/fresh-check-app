
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

// Log app initialization for debugging
console.log('Initializing application...')

// Get the root element - critical for application to load
const rootElement = document.getElementById("root")

if (!rootElement) {
  console.error("Root element not found - critical error")
  // Add visible error message in case console isn't checked
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Failed to initialize: Root element not found</div>'
  throw new Error("Root element not found")
}

// Create root once
const root = createRoot(rootElement)

// Function to hide loader manually if event listener fails
const hideLoader = () => {
  const loader = document.getElementById('loading-indicator')
  if (loader) {
    loader.style.display = 'none'
  }
}

// Render with error handling
try {
  console.log('Rendering application...')
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
  )
  // App rendered successfully, hide loader after a short delay
  setTimeout(hideLoader, 500)
} catch (error) {
  console.error('Critical render error:', error)
  handleError(error, 'root-render')
  hideLoader() // Hide loader even on error
  
  // Fallback render with minimal components
  root.render(
    <div className="p-8 max-w-md mx-auto my-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-red-600 mb-4">
        Application failed to load
      </h2>
      <p className="text-gray-700 mb-4">
        There was a problem loading the application. Please try refreshing the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Refresh Page
      </button>
    </div>
  )
}
