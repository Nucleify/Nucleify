import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { discoverNucSources, toRepoRelative } from './discover'
import { isDirty, type EmitKind } from './fingerprint'
import { emitBaseName, isGeneratedEmit, siblingPath } from './paths'

export type CheckResult = {
  dirty: string[]
  orphans: string[]
}

function walkEmitFiles(dir: string, found: string[]): void {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const name of entries) {
    const full = join(dir, name)
    let st
    try {
      st = statSync(full)
    } catch {
      continue
    }
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === 'fixtures') continue
      walkEmitFiles(full, found)
      continue
    }
    if (name.endsWith('.vue') || name.endsWith('.tsx')) {
      found.push(full)
    }
  }
}

function kindForPath(path: string): EmitKind {
  return path.endsWith('.css') ? 'css' : path.endsWith('.vue') ? 'vue' : 'react'
}

function checkFile(absPath: string, dirty: string[]): void {
  const kind = kindForPath(absPath)
  const contents = readFileSync(absPath, 'utf8')
  if (!isGeneratedEmit(contents, kind)) return
  if (isDirty(contents, kind)) dirty.push(absPath)
}

/**
 * Validate emit fingerprints for discovered portable authoring.
 */
export function checkWorkspace(cwd: string): CheckResult {
  const root = resolve(cwd)
  const dirty: string[] = []
  const orphans: string[] = []
  const nucSources = new Set(discoverNucSources(root).map((p) => resolve(p)))

  for (const nucPath of nucSources) {
    for (const kind of ['vue', 'react', 'css'] as const) {
      const sibling = siblingPath(nucPath, kind)
      if (!existsSync(sibling)) continue
      checkFile(sibling, dirty)
    }
  }

  const emitCandidates: string[] = []
  for (const scanRoot of ['portable', 'web', 'admin', 'shared_modules'].map((p) => join(root, p))) {
    walkEmitFiles(scanRoot, emitCandidates)
  }

  for (const emitPath of emitCandidates) {
    const contents = readFileSync(emitPath, 'utf8')
    const kind = kindForPath(emitPath)
    if (!isGeneratedEmit(contents, kind)) continue
    const base = emitBaseName(emitPath.replace(/\.(vue|tsx)$/, '.nuc.tsx'))
    const nucPath = join(dirname(emitPath), `${base}.nuc.tsx`)
    if (!nucSources.has(resolve(nucPath)) && !existsSync(nucPath)) {
      orphans.push(toRepoRelative(root, emitPath))
    }
  }

  return { dirty: dirty.map((p) => toRepoRelative(root, p)), orphans }
}
