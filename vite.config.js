import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    // proxy: {
    // //   '/api': 'http://192.168.1.92:3000',
    //   '/api': "https://penpaper.cyclic.app"
 
    // },
    proxy : {
      '/api': {
        target: 'https://penpaper.cyclic.app',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [react()],
})
