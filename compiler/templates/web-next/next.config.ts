import type { NextConfig } from 'next'

/** Product Next shell for web — ignore authoring `*.nuc.tsx`. */
const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

export default nextConfig
