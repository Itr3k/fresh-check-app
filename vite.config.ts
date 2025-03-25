
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: "react",
      // Removed the plugin-emotion reference since it's not installed
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === 'development', // Only generate sourcemaps in development
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Drop console logs in production
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 2, // Multiple compression passes for better minification
      },
      mangle: {
        safari10: true, // Better Safari compatibility
      },
      format: {
        comments: false, // Remove comments to reduce size
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create appropriate chunk sizes based on module paths
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'data-vendor';
            }
            if (id.includes('@vercel')) {
              return 'vercel-vendor';
            }
            // Group remaining third-party dependencies
            return 'vendor';
          }
          
          // Split app code for better caching
          if (id.includes('/components/')) {
            return 'components';
          }
          if (id.includes('/pages/')) {
            return 'pages';
          }
          if (id.includes('/hooks/') || id.includes('/contexts/')) {
            return 'app-logic';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable module concatenation for better tree-shaking
    target: 'es2018',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    esbuildOptions: {
      target: 'es2018',
    }
  },
  // Detect slow plugins
  profile: mode === 'development',
}));
