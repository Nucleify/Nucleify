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

const webProject = await defineVitestProject({
  root: webPkg,
  resolve: {
    alias: {
      '@web': path.join(webPkg, 'src'),
      '@admin': path.join(monorepo, 'admin/src'),
      '@shared_modules': path.join(monorepo, 'shared_modules'),
      '@portable': path.join(monorepo, 'portable'),
      nucleify: path.join(webPkg, 'src/nucleify.ts'),
      nuc_api: path.join(
        monorepo,
        'shared_modules/nuc_api/supabase/api/server.ts',
      ),
      nuc_server: path.join(webPkg, 'src/server/nuc_server.ts'),
    },
  },
  test: {
    ...sharedTestDefaults,
    name: 'web',
    environment: 'nuxt',
    include: ['vitests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    testTimeout: 30000,
  },
})

for (const plugin of (webProject.plugins || []) as any[]) {
  if (plugin && plugin.name === 'nuxt:replace' && typeof plugin.applyToEnvironment === 'function') {
    const originalApply = plugin.applyToEnvironment
    plugin.applyToEnvironment = function (environment: any) {
      const result = originalApply.call(this, environment)
      if (result && typeof result.transform === 'function') {
        const originalTransform = result.transform
        result.transform = function (code: string, id: string, options: any) {
          const normalizedOptions =
            typeof options === 'object' && options !== null && !options.moduleType
              ? { ...options, moduleType: 'js' }
              : options
          return originalTransform.call(this, code, id, normalizedOptions)
        }
      }
      return result
    }
  }
}

export default defineConfig({
  test: {
    projects: [
      webProject,
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
