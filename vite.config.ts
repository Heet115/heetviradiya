import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting and optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for different libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('lucide-react')) {
              return 'lucide-icons';
            }
            if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
              return 'vercel-analytics';
            }
            // Group other vendor libraries
            return 'vendor';
          }
          
          // Split components into logical chunks
          if (id.includes('/components/')) {
            if (id.includes('Hero') || id.includes('Navbar') || id.includes('WelcomeOverlay')) {
              return 'critical-components';
            }
            if (id.includes('Projects') || id.includes('ProjectCard') || id.includes('ProjectDetail')) {
              return 'projects';
            }
            return 'components';
          }
        }
      }
    },
    // Enable minification (using esbuild which is faster and built-in)
    minify: 'esbuild',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Disable source maps for production
    sourcemap: false
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false
    }
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false
  }
})