import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { emitNucTsx } from '../emit/nuc'
import { parseReactToIr } from '../parse/react'
import { parseTsxToIr } from '../parse/tsx'
import { parseVueToIr } from '../parse/vue'
import { biomeFormat } from './biome-format'
import { isDirty, stripEmitHeaders, type EmitKind } from './fingerprint'
import { toRepoRelative } from './discover'
import {
  emitBaseName,
  inferComponentName,
  isGeneratedEmit,
  nucPathFromEmit,
  resolveImportPath,
  siblingPath,
} from './paths'
import { writeOutputs } from './write-outputs'
import type { IrDocument } from '../ir/types'

function readCssFile(cssPath: string): string | undefined {
  if (!existsSync(cssPath)) return undefined
  const raw = readFileSync(cssPath, 'utf8')
  return stripEmitHeaders(raw, 'css').trim()
}

function loadCssIntoIr(componentPath: string, ir: IrDocument): IrDocument {
  if (ir.styles?.css) return ir
  const base = emitBaseName(
    componentPath.replace(/\.vue$/, '.nuc.tsx').replace(/\.tsx$/, '.nuc.tsx'),
  )
  const candidates = [
    join(dirname(componentPath), `${base}.css`),
    join(dirname(componentPath), '../css', `${base}.css`),
    siblingPath(componentPath.replace(/\.(vue|tsx)$/, '.nuc.tsx'), 'css'),
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
  if (!isGeneratedEmit(contents, kind === 'css' ? 'css' : kind)) return false
  return isDirty(contents, kind)
}

export function inferImportFrom(
  cwd: string,
  inputPath: string,
  fromArg?: string,
): 'vue' | 'react' {
  if (fromArg === 'vue' || fromArg === 'react') return fromArg

  const { componentPath, kind } = resolveImportPath(cwd, inputPath)
  const nucPath = nucPathFromEmit(componentPath)
  const vuePath = siblingPath(nucPath, 'vue')
  const reactPath = siblingPath(nucPath, 'react')
  const cssPath = siblingPath(nucPath, 'css')

  const vueDirty = fileDirty(vuePath, 'vue')
  const reactDirty = fileDirty(reactPath, 'react')
  const cssDirty = fileDirty(cssPath, 'css')

  if (vueDirty && reactDirty) {
    throw new Error(
      'import: both .vue and .tsx are dirty — pass --from=vue or --from=react',
    )
  }
  if (vueDirty) return 'vue'
  if (reactDirty) return 'react'
  if (cssDirty) return kind === 'react' ? 'react' : 'vue'
  if (kind === 'react') return 'react'
  return 'vue'
}

function assertImportable(
  cwd: string,
  componentPath: string,
  kind: 'vue' | 'react',
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
  from?: 'vue' | 'react'
  force?: boolean
}

/**
 * Import dirty Vue/React emit → IR → *.nuc.tsx + refreshed siblings.
 */
export async function runImport(
  opts: RunImportOpts,
): Promise<{ nucPath: string; written: string[]; from: 'vue' | 'react' }> {
  const cwd = resolve(opts.cwd)
  const from = inferImportFrom(cwd, opts.path, opts.from)
  const { componentPath } = resolveImportPath(cwd, opts.path)

  // Prefer the emit matching --from when path was .css
  const nucPathGuess = nucPathFromEmit(componentPath)
  const preferred =
    from === 'vue' ? siblingPath(nucPathGuess, 'vue') : siblingPath(nucPathGuess, 'react')
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

  let ir =
    from === 'vue'
      ? parseVueToIr(source, emitPath, { name })
      : parseReactToIr(source, emitPath, { name })
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
