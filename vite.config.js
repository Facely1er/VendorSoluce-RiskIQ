import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for security
    minify: 'esbuild', // Use esbuild (faster and included with Vite)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  },
  esbuild: {
    // Remove console.log and debugger statements in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
})
