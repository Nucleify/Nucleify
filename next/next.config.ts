import path from 'node:path'

import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

const nextDirname = path.dirname(fileURLToPath(import.meta.url))
const sassGlobalEntry = path
  .join(nextDirname, 'assets/_index.scss')
  .replace(/\\/g, '/')

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['.'],
    silenceDeprecations: [
      'mixed-decls',
      'import',
      'color-functions',
      'global-builtin',
      'legacy-js-api',
    ],
    prependData: `@use 'sass:color' as color; @import "${sassGlobalEntry}";`,
  },
  /**
   * Relative `/api/*` fetches hit Next first. Laravel exposes modules (and other
   * APIs) under `/api/...`. When `NEXT_PUBLIC_API_URL` is unset, `nucModulesApiUrl`
   * stays relative so same-origin `fetch` is proxied here (default local Laravel).
   */
  async rewrites() {
    const raw = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
    const laravelOrigin = raw?.replace(/\/api$/, '') ?? 'http://127.0.0.1:8000'
    return [
      {
        source: '/api/:path*',
        destination: `${laravelOrigin}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
