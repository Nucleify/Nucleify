import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { emitNucTsx } from '../emit/nuc'
import { parseReactToIr } from '../parse/react'
import { parseSolidToIr } from '../parse/solid'
import { parseSvelteToIr } from '../parse/svelte'
import { parseTsxToIr } from '../parse/tsx'
import { parseVueToIr } from '../parse/vue'
import { biomeFormat } from './biome-format'
import { isDirty, stripEmitHeaders, type EmitKind } from './fingerprint'
import { toRepoRelative } from './discover'
import {
  emitBaseName,
  inferComponentName,
  isGeneratedEmit,
  isSolidEmitSource,
  nucPathFromEmit,
  resolveImportPath,
  siblingPath,
} from './paths'
import { writeOutputs } from './write-outputs'
import type { IrDocument } from '../ir/types'

export type ImportFrom = 'vue' | 'react' | 'solid' | 'svelte'

function readCssFile(cssPath: string): string | undefined {
  if (!existsSync(cssPath)) return undefined
  const raw = readFileSync(cssPath, 'utf8')
  return stripEmitHeaders(raw, 'css').trim()
}

function loadCssIntoIr(componentPath: string, ir: IrDocument): IrDocument {
  if (ir.styles?.css) return ir
  const base = emitBaseName(
    componentPath
      .replace(/\.vue$/, '.nuc.tsx')
      .replace(/\.tsx$/, '.nuc.tsx')
      .replace(/\.svelte$/, '.nuc.tsx'),
  )
  const candidates = [
    join(dirname(componentPath), `${base}.css`),
    join(dirname(componentPath), '../css', `${base}.css`),
    siblingPath(componentPath.replace(/\.(vue|tsx|svelte)$/, '.nuc.tsx'), 'css'),
  ]
  for (const cssPath of candidates) {
    const css = readCssFile(cssPath)
    if (css) return { ...ir, styles: { css } }
  }
  return ir
}

function fileDirty(absPath: string, kind: EmitKind): boolean {
  if (!existsSync(absPath)) return false
  const contents = readFileSync(absPath, 'utf8')
  const emitKind =
    kind === 'css' ? 'css' : kind === 'solid' ? 'solid' : (kind as 'vue' | 'react' | 'svelte')
  if (!isGeneratedEmit(contents, emitKind)) {
    return false
  }
  return isDirty(contents, kind)
}

function parseEmitToIr(
  from: ImportFrom,
  source: string,
  emitPath: string,
  name: string,
): IrDocument {
  if (from === 'vue') return parseVueToIr(source, emitPath, { name })
  if (from === 'react') return parseReactToIr(source, emitPath, { name })
  if (from === 'solid') return parseSolidToIr(source, emitPath, { name })
  return parseSvelteToIr(source, emitPath, { name })
}

export function inferImportFrom(
  cwd: string,
  inputPath: string,
  fromArg?: string,
): ImportFrom {
  if (
    fromArg === 'vue' ||
    fromArg === 'react' ||
    fromArg === 'solid' ||
    fromArg === 'svelte'
  ) {
    return fromArg
  }

  const { componentPath, kind } = resolveImportPath(cwd, inputPath)
  const nucPath = nucPathFromEmit(componentPath)
  const vuePath = siblingPath(nucPath, 'vue')
  const reactPath = siblingPath(nucPath, 'react')
  const sveltePath = siblingPath(nucPath, 'svelte')
  const cssPath = siblingPath(nucPath, 'css')

  const vueDirty = fileDirty(vuePath, 'vue')
  const reactDirty =
    existsSync(reactPath) &&
    !isSolidEmitSource(readFileSync(reactPath, 'utf8')) &&
    fileDirty(reactPath, 'react')
  const svelteDirty = fileDirty(sveltePath, 'svelte')
  const cssDirty = fileDirty(cssPath, 'css')

  // Solid is demo-path (or explicit .tsx with solid headers), not a product sibling.
  const solidDirty =
    kind === 'solid' && existsSync(componentPath) && fileDirty(componentPath, 'solid')

  const dirtyFrames = [
    vueDirty && 'vue',
    reactDirty && 'react',
    solidDirty && 'solid',
    svelteDirty && 'svelte',
  ].filter(Boolean) as ImportFrom[]

  if (dirtyFrames.length > 1) {
    throw new Error(
      `import: multiple emits dirty (${dirtyFrames.join(', ')}) — pass --from=vue|react|solid|svelte`,
    )
  }
  if (dirtyFrames.length === 1) return dirtyFrames[0]!
  if (cssDirty) {
    if (kind === 'react') return 'react'
    if (kind === 'solid') return 'solid'
    if (kind === 'svelte') return 'svelte'
    return 'vue'
  }
  if (kind === 'react') return 'react'
  if (kind === 'solid') return 'solid'
  if (kind === 'svelte') return 'svelte'
  return 'vue'
}

function assertImportable(
  cwd: string,
  componentPath: string,
  kind: ImportFrom,
  force: boolean,
): string {
  const abs = resolve(componentPath)
  const contents = readFileSync(abs, 'utf8')
  const nucPath = nucPathFromEmit(abs)
  const generated = isGeneratedEmit(contents, kind)
  if (!generated && !existsSync(nucPath)) {
    throw new Error(
      `import: ${toRepoRelative(cwd, abs)} is not @generated and has no sibling *.nuc.tsx`,
    )
  }
  const cssPath = siblingPath(nucPath, 'css')
  const componentDirty = isDirty(contents, kind as EmitKind)
  const cssDirty = fileDirty(cssPath, 'css')
  if (!force && !componentDirty && !cssDirty) {
    throw new Error(
      'import: nothing to import (emit is clean). Use --force to re-import anyway.',
    )
  }
  return nucPath
}

export type RunImportOpts = {
  cwd: string
  path: string
  from?: ImportFrom
  force?: boolean
}

/**
 * Import dirty Vue/React/Solid/Svelte emit → IR → *.nuc.tsx + refreshed siblings.
 */
export async function runImport(
  opts: RunImportOpts,
): Promise<{ nucPath: string; written: string[]; from: ImportFrom }> {
  const cwd = resolve(opts.cwd)
  const from = inferImportFrom(cwd, opts.path, opts.from)
  const { componentPath } = resolveImportPath(cwd, opts.path)

  const nucPathGuess = nucPathFromEmit(componentPath)
  // Solid has no product sibling next to *.nuc.tsx — import the resolved .tsx path.
  const preferred =
    from === 'vue' || from === 'react' || from === 'svelte'
      ? siblingPath(nucPathGuess, from)
      : componentPath
  const emitPath = existsSync(preferred) ? preferred : componentPath

  const nucPath = assertImportable(cwd, emitPath, from, Boolean(opts.force))
  const source = readFileSync(emitPath, 'utf8')

  let name = inferComponentName(emitBaseName(nucPath))
  if (existsSync(nucPath)) {
    try {
      name = parseTsxToIr(readFileSync(nucPath, 'utf8'), toRepoRelative(cwd, nucPath)).name
    } catch {
      // keep inferred name
    }
  }

  let ir = parseEmitToIr(from, source, emitPath, name)
  ir = loadCssIntoIr(emitPath, ir)

  let nucBody = emitNucTsx(ir)
  nucBody = await biomeFormat(nucBody, toRepoRelative(cwd, nucPath), cwd)
  writeFileSync(nucPath, nucBody, 'utf8')

  const { written } = await writeOutputs({
    cwd,
    sourcePath: nucPath,
    ir,
    target: 'all',
    force: true,
    siblings: true,
  })

  return { nucPath, written, from }
}
