
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import React from 'react'

// Get root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found");
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </React.StrictMode>
  );
}

// Simple HMR setup that avoids conflicts with React refresh
if (import.meta.hot) {
  import.meta.hot.accept();
}
