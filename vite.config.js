import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // '/api': 'http://192.168.1.92:3000',
      // '/api': "https://penpaper.cyclic.app/"
      '/api': {
        target: 'https://penpaper.cyclic.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  plugins: [react()],
})
