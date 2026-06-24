import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { loadEnvConfig } from '@next/env'
import type { NextConfig } from 'next'

const configDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.dirname(configDir)

// `next dev next` uses `next/` as the app dir; reload repo-root `.env*` (see @next/env cache).
loadEnvConfig(repoRoot, process.env.NODE_ENV !== 'production', undefined, true)

const publicSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const publicSupabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  ''
const publicConvertDocumentsUrl =
  process.env.NEXT_PUBLIC_CONVERT_DOCUMENTS_URL ||
  process.env.NUC_CONVERT_DOCUMENTS_URL ||
  ''
const nextDirname = path.join(repoRoot, 'next')
const modulesDir = path.join(repoRoot, 'modules')

const sassAdditionalData = [
  '@use "sass:color" as color;',
  '@import "next/assets/_index.scss";',
  '',
].join('\n')

/** Relative to Next project dir (`next/`). */
const resolveAliases = {
  nuc_client: '../modules/nuc_api/supabase/client.ts',
  nuc_api: '../modules/nuc_api/supabase/api/server.ts',
  nuc_server: '../nuxt/server/nuc_server.ts',
  modules: '../modules',
  nucleify: './atomic/index.ts',
} as const

const nextProjectDir = path.join(repoRoot, 'next')
const resolveAliasesAbsolute = Object.fromEntries(
  Object.entries(resolveAliases).map(([name, target]) => [
    name,
    path.resolve(nextProjectDir, target),
  ])
)

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: publicSupabaseUrl,
    NEXT_PUBLIC_SUPABASE_KEY: publicSupabaseKey,
    NEXT_PUBLIC_CONVERT_DOCUMENTS_URL: publicConvertDocumentsUrl,
    NUC_CONVERT_DOCUMENTS_URL: publicConvertDocumentsUrl,
  },
  typescript: {
    tsconfigPath: '../tsconfig.next.json',
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: repoRoot,
    resolveAlias: resolveAliases,
    // Nuxt .vue siblings must not win over .tsx in shared modules/
    resolveExtensions: [
      '.tsx',
      '.react.ts',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },
  webpack(config) {
    for (const [name, target] of Object.entries(resolveAliasesAbsolute)) {
      config.resolve.alias[name] = target
    }
    // Shared modules ship .vue (Nuxt) beside .tsx (Next) — do not resolve .vue in Next.
    config.resolve.extensions = [
      '.tsx',
      '.react.ts',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ]

    // Align CSS module class names with Nuxt/Vite (`index-module__ad-datatable__hash`).
    const localIdentName = '[name]__[local]__[hash:base64:6]'
    for (const rule of config.module.rules) {
      if (typeof rule !== 'object' || !rule || !('oneOf' in rule)) continue
      for (const one of rule.oneOf as { use?: unknown }[]) {
        const uses = one.use
        if (!Array.isArray(uses)) continue
        for (const use of uses) {
          if (
            typeof use !== 'object' ||
            !use ||
            !('loader' in use) ||
            typeof use.loader !== 'string' ||
            !use.loader.includes('css-loader')
          ) {
            continue
          }
          const options = use.options as { modules?: Record<string, unknown> }
          if (options?.modules && typeof options.modules === 'object') {
            options.modules.localIdentName = localIdentName
          }
        }
      }
    }

    return config
  },
  sassOptions: {
    includePaths: [repoRoot, nextDirname, modulesDir],
    loadPaths: [repoRoot, nextDirname, modulesDir],
    silenceDeprecations: [
      'mixed-decls',
      'import',
      'color-functions',
      'global-builtin',
      'legacy-js-api',
    ],
    additionalData: sassAdditionalData,
  },
}

export default nextConfig
