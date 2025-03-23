
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SpeedInsights } from '@vercel/speed-insights/react';

// Use a safer DOM access pattern with optional chaining
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found! Make sure there is a div with id 'root' in your HTML.");
} else {
  const root = createRoot(rootElement);
  
  root.render(
    <>
      <App />
      <SpeedInsights />
    </>
  );
}
