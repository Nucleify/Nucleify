import type { NextConfig } from 'next'

/** Minimal Next demo — ignore authoring `*.nuc.tsx` if any slip into the tree. */
const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

export default nextConfig
