import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './frontEnd', // frontEnd klasörünü root olarak belirle
  build: {
    outDir: '../dist' // Build çıktısını ana dizine koy
  }
})
