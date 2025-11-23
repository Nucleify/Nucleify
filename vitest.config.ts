import { defineVitestConfig } from '@nuxt/test-utils/config'
import { resolve } from 'path'

export default defineVitestConfig({
  resolve: {
    alias: {
      atomic: resolve(__dirname, 'nuxt/atomic'),
    },
  },
  test: {
    environment: 'nuxt',
    setupFiles: ['./vitests/setup.ts'],
    include: [
      'vitests/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'modules/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    testTimeout: 30000,
    onConsoleLog: () => false,
    teardownTimeout: 5000,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
  },
})
