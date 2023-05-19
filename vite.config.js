import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // server: {
  //   proxy : {
  //     '/api': {
  //       target: 'https://penpaper.cyclic.app',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   }
  // },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './setupTests.js',
  }
});
