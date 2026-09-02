import { readFileSync } from 'node:fs'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { emitReactProduct } from '../emit/react'
import { parseIrDocument } from '../ir/schema'
import type { IrDocument } from '../ir/types'
import { ParseError } from '../parse/tsx'
import { parseVueTemplateToIr } from '../parse/vue'
import { rewriteScriptSetupToReact, extractReactiveNames } from './script-to-react'
import { emitBaseName, inferComponentName } from './paths'

/**
 * Convert a Vue SFC to React TSX using template IR + script rewrite (product pages).
 */
export function convertVueSfcToReact(source: string, filePath: string): { body: string; name: string } {
  const { descriptor, errors } = parseSfc(source, { filename: filePath })
  if (errors.length) {
    throw new ParseError(errors.map((e) => e.message).join('; '), filePath)
  }
  if (!descriptor.template?.content) {
    throw new ParseError('expected <template> in vue file', filePath)
  }

  const script = descriptor.scriptSetup?.content?.trim() ?? ''
  const template = parseVueTemplateToIr(descriptor.template.content, filePath)
  const base = emitBaseName(filePath.replace(/\.vue$/, '.nuc.tsx'))
  const name = inferComponentName(base)

  const doc: IrDocument = parseIrDocument({
    irVersion: '0.1.0',
    name,
    portable: true,
    props: [],
    state: [],
    derived: [],
    handlers: [],
    template,
    meta: { sourcePath: filePath },
  })

  const scriptPart = script ? rewriteScriptSetupToReact(script) : { imports: [], body: [] }
  const stateNames = script ? extractReactiveNames(script) : new Set<string>()
  const cssImport = script.match(/import\s+['"]([^'"]+\.css)['"]/)
  const body = emitReactProduct(doc, scriptPart, {
    cssFileName: cssImport ? emitBaseName(filePath) : undefined,
    stateNames,
  })

  return { body, name }
}

export function convertVueSfcFileToReact(vuePath: string): { body: string; name: string } {
  return convertVueSfcToReact(readFileSync(vuePath, 'utf8'), vuePath)
}
