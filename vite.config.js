import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000
  },
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: [ "@emotion/babel-plugin" ]
    }
  }),
    compression({ algorithm: 'brotliCompress' }), // Enable Brotli compression
    compression({ algorithm: 'gzip' }) // Enable Gzip compression
  ],
  server: {
    proxy: {
      '/api': "http://localhost:8000"
    }
  }
})
