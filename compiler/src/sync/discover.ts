import { readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.nuxt',
  '.output',
  'dist',
  'coverage',
  '.turbo',
  '.cache',
])

/**
 * Discover `*.nuc.tsx` under workspace apps / shared_modules (skip node_modules etc.).
 */
export function discoverNucSources(cwd: string): string[] {
  const roots = ['portable', 'root', 'admin', 'shared_modules'].map((p) => resolve(cwd, p))
  const found: string[] = []

  function walk(dir: string): void {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const name of entries) {
      if (SKIP_DIRS.has(name)) continue
      const full = join(dir, name)
      let st
      try {
        st = statSync(full)
      } catch {
        continue
      }
      if (st.isDirectory()) {
        if (name === 'fixtures') continue
        walk(full)
      } else if (st.isFile() && name.endsWith('.nuc.tsx')) {
        found.push(full)
      }
    }
  }

  for (const root of roots) {
    walk(root)
  }

  return found.sort((a, b) => a.localeCompare(b))
}

export function toRepoRelative(cwd: string, absPath: string): string {
  return relative(cwd, absPath).split('\\').join('/')
}
