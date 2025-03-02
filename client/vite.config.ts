import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material'],
          'react-vendor': ['react', 'react-dom'],
          'map': ['leaflet', 'react-leaflet'],
          'tanstack': ['@tanstack/react-query', '@tanstack/react-router'],
          'date': ['date-fns', 'react-date-range'],
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
  },
})
