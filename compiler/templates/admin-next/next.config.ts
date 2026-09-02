import type { NextConfig } from 'next'

/** Product Next shell for admin — ignore authoring `*.nuc.tsx`. */
const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

export default nextConfig
