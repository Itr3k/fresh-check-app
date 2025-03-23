
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add iOS momentum scrolling for mobile
if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--webkit-overflow-scrolling', 'touch');
}

// Create a function to measure and optimize first render
const startApp = () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  // For analytics or other non-critical work
  window.requestIdleCallback(() => {
    // Mark the app as ready for analytics or other initialization
    console.log('App initialized during idle period');
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(() => {
    console.log('App initialized with setTimeout fallback');
  }, 1);
}

// Start the app immediately
startApp();
