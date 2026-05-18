import path from 'node:path'

import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default defineVitestConfig({
  // @ts-expect-error - root is valid in Vitest but not in @nuxt/test-utils types
  root,
  test: {
    environment: 'nuxt',
    setupFiles: [path.join(root, 'vitests/setup.ts')],
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
