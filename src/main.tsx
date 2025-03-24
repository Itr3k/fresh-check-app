
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import React from 'react'

// Get root element
const rootElement = document.getElementById("root");

// Create a React component to properly wrap Analytics and SpeedInsights
const AppWithAnalytics = () => {
  return (
    <React.StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </React.StrictMode>
  );
};

// Basic render function
function renderApp() {
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }
  
  const root = createRoot(rootElement);
  root.render(<AppWithAnalytics />);
}

// Initial render
renderApp();

// Simple HMR setup
if (import.meta.hot) {
  import.meta.hot.accept();
}
