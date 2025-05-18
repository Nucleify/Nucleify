import { resolve } from 'path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  resolve: {
    alias: {
      atomic: resolve(__dirname, 'nuxt/atomic'),
    },
  },
  test: {
    environment: 'nuxt',
    include: [
      'vitests/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'modules/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
  },
})
