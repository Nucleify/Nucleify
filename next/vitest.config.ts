import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, '../vitests/setup.ts')],
    alias: {
      nucleify: path.resolve(__dirname, './index.ts'),
      atomic: path.resolve(__dirname, './atomic/index.ts'),
      modules: path.resolve(__dirname, './modules/index.ts'),
    },
  },
})
