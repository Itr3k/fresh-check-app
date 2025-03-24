
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Configure React plugin with explicit options for HMR support
      jsxRuntime: 'automatic',
      babel: {
        plugins: [],
        babelrc: false,
        configFile: false,
      }
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
    hmr: {
      protocol: 'ws',
      timeout: 30000,
      clientPort: 8080, // Ensure the client port matches the server port
    },
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
  // Add specific configuration for HMR and optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}))
