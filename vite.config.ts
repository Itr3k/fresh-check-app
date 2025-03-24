
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Add React plugin options if needed
      jsxRuntime: 'automatic'
      // Note: fastRefresh is enabled by default, so we don't need to specify it
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
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
  // Add specific configuration for HMR to help with the refresh issue
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
}))
