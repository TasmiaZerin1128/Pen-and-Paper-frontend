# Pen & Paper 
## Created frontend with React and MUI



Instructions for running the frontend from any host and backend in one IP
Edit vite.config.js ->
export default defineConfig({
  server: {
    proxy : {
      '/api': {
        target: 'https://penpaper.cyclic.app',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  plugins: [react()],
})
