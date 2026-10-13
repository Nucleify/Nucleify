import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const monorepo = join(dirname(fileURLToPath(import.meta.url)), '../..')

const BARREL_NAMES = new Set([
  'index.ts',
  'index.tsx',
  'index.react.ts',
  'modules.ts',
  'nucleify.ts',
])

const SKIP_DIR = new Set([
  'node_modules',
  '.git',
  'dist',
  '.nuxt',
  '.output',
  'coverage',
  'vue',
  'react',
  'nuxt',
  'next',
  'solid',
  'svelte',
  'web-next',
  'admin-next',
  'web-solid',
  'admin-solid',
  'web-svelte',
  'admin-svelte',
  'compiler/tests',
  'docs/src/lib/utils',
])

function shouldSkip(rel: string): boolean {
  const parts = rel.split(/[/\\]/)
  if (parts.some((p) => SKIP_DIR.has(p))) return true
  if (rel.includes('markdown_bundle.generated')) return true
  return false
}

function walk(dir: string, out: string[]): void {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const name of entries) {
    const abs = join(dir, name)
    const rel = relative(monorepo, abs)
    if (shouldSkip(rel)) continue
    let st
    try {
      st = statSync(abs)
    } catch {
      continue
    }
    if (st.isDirectory()) {
      walk(abs, out)
      continue
    }
    if (BARREL_NAMES.has(name)) out.push(abs)
  }
}

const NUC_EXPORT_RE =
  /(?:export\s+[\s\S]*?from\s+|import\s+[\s\S]*?from\s+)['"][^'"]*\.nuc(?:\.tsx)?['"]/

describe('barrels must not export *.nuc.tsx', () => {
  it('index / modules / nucleify barrels never import or re-export authoring', () => {
    const barrels: string[] = []
    for (const root of ['shared_modules', 'web', 'admin', 'docs', 'portable', 'compiler']) {
      walk(join(monorepo, root), barrels)
    }
    expect(barrels.length).toBeGreaterThan(10)
    const offenders: string[] = []
    for (const abs of barrels) {
      const src = readFileSync(abs, 'utf8')
      if (NUC_EXPORT_RE.test(src) || src.includes('.nuc.tsx')) {
        // Allow comments that mention the extension in docs-like barrels only if no import.
        if (/\bfrom\s+['"][^'"]*\.nuc\.tsx['"]/.test(src) || /export\s+.*\.nuc\.tsx/.test(src)) {
          offenders.push(relative(monorepo, abs))
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
