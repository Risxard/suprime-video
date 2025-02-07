import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/preview/suprime-video',
  server: {
    port: 3000,
  },
  plugins: [react()],
  build: {
    minify: 'esbuild',
  },
})
