import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

const monorepo = path.dirname(fileURLToPath(import.meta.url))
const setupFile = path.join(monorepo, '.config/vitest_setup.ts')
const webPkg = path.join(monorepo, 'web')
const sharedPkg = path.join(monorepo, 'shared_modules')

const sharedTestDefaults = {
  setupFiles: [setupFile],
  onConsoleLog: () => false as const,
  pool: 'threads' as const,
  poolOptions: {
    threads: {
      singleThread: false,
    },
  },
}

export default defineConfig({
  test: {
    projects: [
      await defineVitestProject({
        root: webPkg,
        resolve: {
          alias: {
            nucleify: path.join(webPkg, 'src/nucleify.ts'),
          },
        },
        test: {
          ...sharedTestDefaults,
          name: 'web',
          environment: 'nuxt',
          include: ['vitests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
          testTimeout: 30000,
        },
      }),
      {
        root: sharedPkg,
        resolve: {
          alias: {
            nucleify: path.join(sharedPkg, 'nucleify.ts'),
          },
        },
        define: {
          'import.meta.client': true,
          'import.meta.server': false,
        },
        test: {
          ...sharedTestDefaults,
          name: 'shared',
          environment: 'happy-dom',
          include: ['**/vitests/**/*.{test,spec}.{js,ts}'],
          testTimeout: 15000,
        },
      },
    ],
  },
})
