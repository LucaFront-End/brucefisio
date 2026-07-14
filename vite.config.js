import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wix-api': {
        target: 'https://www.wixapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wix-api/, '')
      }
    }
  }
})
