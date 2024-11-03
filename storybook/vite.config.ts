import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import viteCompression from "vite-plugin-compression"
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteCompression(),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
