
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add React plugin options if needed
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    // SPA fallback for client-side routing
    proxy: {
      '/*': {
        target: '/',
        changeOrigin: false,
        rewrite: (path) => '/index.html',
      },
    },
  },
  // Ensure proper SPA behavior when building for production
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@/components/ui'],
        },
      },
    },
  },
})
