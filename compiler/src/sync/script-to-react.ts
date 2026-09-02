import { parseSync } from 'oxc-parser'

function slice(source: string, start: number, end: number): string {
  return source.slice(start, end)
}

function paramText(source: string, param: any): string {
  if (param?.start != null && param?.end != null) return slice(source, param.start, param.end)
  if (param?.type === 'Identifier') return param.name
  if (param?.type === 'AssignmentPattern' && param.left?.type === 'Identifier') {
    return paramText(source, param.left)
  }
  return 'arg'
}

function isDomRef(source: string, name: string, init: any): boolean {
  const initText =
    init?.start != null && init?.end != null ? slice(source, init.start, init.end) : ''
  const typeMatch = source.match(new RegExp(`const ${name} = ref<([^>]+)>`))
  if (typeMatch && /HTMLElement|Element/.test(typeMatch[1]!)) return true
  return init?.type === 'NullLiteral' || initText === 'null'
}

function collectRefInfo(script: string): {
  refNames: Set<string>
  domRefNames: Set<string>
  usesReactive: boolean
} {
  const refNames = new Set<string>()
  const domRefNames = new Set<string>()
  let usesReactive = false
  const result = parseSync('script.ts', script, { lang: 'ts', sourceType: 'module' })
  for (const stmt of result.program.body ?? []) {
    if (stmt.type !== 'VariableDeclaration' || stmt.kind !== 'const') continue
    for (const decl of stmt.declarations) {
      if (decl.id?.type !== 'Identifier') continue
      const init = decl.init
      if (init?.type !== 'CallExpression' || init.callee?.type !== 'Identifier') continue
      if (init.callee.name === 'reactive') {
        usesReactive = true
        refNames.add(decl.id.name)
        continue
      }
      if (init.callee.name === 'ref' || init.callee.name === 'computed') {
        refNames.add(decl.id.name)
        if (init.callee.name === 'ref' && isDomRef(script, decl.id.name, init.arguments?.[0])) {
          domRefNames.add(decl.id.name)
        }
      }
    }
  }
  return { refNames, domRefNames, usesReactive }
}

/** Collect reactive binding names for template parsing (no `.value` wrapping). */
export function extractReactiveNames(script: string): Set<string> {
  return collectRefInfo(script).refNames
}

function rewriteValueAccess(
  source: string,
  refNames: Set<string>,
  domRefNames: Set<string>,
): string {
  let out = source
    .replace(/\bawait nextTick\(\)/g, 'await Promise.resolve()')
    .replace(/\bnextTick\(\)/g, 'Promise.resolve()')
  for (const name of domRefNames) {
    out = out.replaceAll(new RegExp(`\\b${name}\\.value\\b`, 'g'), `${name}.current`)
  }
  for (const name of refNames) {
    if (domRefNames.has(name)) continue
    out = out.replaceAll(new RegExp(`\\b${name}\\.value\\b`, 'g'), name)
  }
  return out
}

function rewriteNuxtInBody(line: string): string {
  return line
    .replace(/\buseRoute\(\)/g, 'useParams()')
    .replace(/\broute\.params\./g, 'params.')
    .replace(/\bconst route\b/g, 'const params')
}

function rewriteStateAssignment(line: string, refNames: Set<string>, domRefNames: Set<string>): string {
  let out = line
  for (const name of refNames) {
    if (domRefNames.has(name)) continue
    const setter = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`
    out = out.replace(new RegExp(`\\b${name}\\s*=\\s*([^;\\n]+)`, 'g'), `${setter}($1)`)
  }
  return out
}

function formatConstDecl(script: string, stmt: any, decl: any): string {
  const idStart = decl.id?.start ?? decl.start
  const end = decl.end ?? stmt.end
  const prefix = stmt.kind === 'const' ? 'const ' : stmt.kind === 'let' ? 'let ' : ''
  return prefix + slice(script, idStart, end)
}

function rewriteNuxtImports(line: string): string {
  return line
    .replace(
      /import\s+\{\s*useRoute\s*\}\s+from\s+(['"])nuxt\/app\1/g,
      "import { useParams } from 'next/navigation'",
    )
    .replace(/\buseRoute\(\)/g, 'useParams()')
    .replace(/\broute\.params\.(\w+)/g, 'params.$1')
    .replace(/\bconst route = useParams\(\)/g, 'const params = useParams()')
}

function rewriteVueImport(needsReactive: boolean): string {
  const lines = [`import { useEffect, useMemo, useRef, useState } from 'react'`]
  if (needsReactive) lines.push(`import { useReactive } from '@/lib/vue-reactivity-shim'`)
  return lines.join('\n')
}

function emitRefBinding(source: string, name: string, init: any): string {
  const initText =
    init?.start != null && init?.end != null ? slice(source, init.start, init.end) : 'null'
  if (isDomRef(source, name, init)) {
    const typeMatch = source.match(new RegExp(`const ${name} = ref<([^>]+)>`))
    const typeParam = typeMatch?.[1] ?? 'HTMLElement | null'
    return `const ${name} = useRef<${typeParam}>(${initText === 'null' ? 'null' : initText})`
  }
  const setter = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return `const [${name}, ${setter}] = useState(${initText})`
}

function unwrapArrowBody(body: string): string {
  const trimmed = body.trim()
  const match = trimmed.match(/^(?:async\s*)?\([^)]*\)\s*=>\s*([\s\S]+)$/)
  if (match) return match[1]!.trim()
  return trimmed
}

function emitComputedBinding(
  source: string,
  name: string,
  init: any,
  refNames: Set<string>,
  domRefNames: Set<string>,
): string {
  const arg = init.arguments?.[0]
  let body = 'undefined'
  if (arg?.start != null && arg?.end != null) body = slice(source, arg.start, arg.end)
  body = unwrapArrowBody(body)
  body = rewriteNuxtInBody(rewriteValueAccess(body, refNames, domRefNames))
  // Extract only refs that are actually referenced in the computed body
  const deps = [...refNames]
    .filter((n) => n !== name && !domRefNames.has(n) && new RegExp(`\\b${n}\\b`).test(body))
    .join(', ')
  return `const ${name} = useMemo(() => ${body}, [${deps}])`
}

function emitReactiveBinding(source: string, name: string, init: any): string {
  const initText =
    init?.arguments?.[0]?.start != null
      ? slice(source, init.arguments[0].start, init.arguments[0].end)
      : '{}'
  return `const ${name} = useReactive(${initText})`
}

function rewriteLifecycleCall(
  source: string,
  node: any,
  refNames: Set<string>,
  domRefNames: Set<string>,
): string {
  const callee = node.callee?.name
  const arg = node.arguments?.[0]
  if (!arg) return rewriteValueAccess(slice(source, node.start, node.end), refNames, domRefNames)

  if (callee === 'onMounted') {
    const fnText =
      arg.start != null && arg.end != null ? slice(source, arg.start, arg.end) : '() => {}'
    const body = rewriteStateAssignment(
      rewriteNuxtInBody(rewriteValueAccess(fnText, refNames, domRefNames)),
      refNames,
      domRefNames,
    )
    return `useEffect(() => {\n  void (${body})()\n}, [])`
  }

  if (callee === 'onBeforeUnmount') {
    const fnText =
      arg.start != null && arg.end != null ? slice(source, arg.start, arg.end) : '() => {}'
    const body = rewriteStateAssignment(
      rewriteNuxtInBody(rewriteValueAccess(fnText, refNames, domRefNames)),
      refNames,
      domRefNames,
    )
    return `useEffect(() => {\n  return ${body}\n}, [])`
  }

  if (callee === 'watch') {
    const src = node.arguments?.[0]
    const cb = node.arguments?.[1]
    const srcText =
      src?.start != null && src?.end != null ? slice(source, src.start, src.end) : 'undefined'
    let cbText =
      cb?.start != null && cb?.end != null ? slice(source, cb.start, cb.end) : '() => {}'
    cbText = rewriteStateAssignment(
      rewriteNuxtInBody(rewriteValueAccess(cbText, refNames, domRefNames)),
      refNames,
      domRefNames,
    )
    const deps = rewriteNuxtInBody(rewriteValueAccess(srcText, refNames, domRefNames))
    return `useEffect(() => {\n  void (${cbText})(${deps})\n}, [${deps}])`
  }

  return rewriteValueAccess(slice(source, node.start, node.end), refNames, domRefNames)
}

/**
 * Rewrite `<script setup>` to React hooks + statements (product convert).
 */
export function rewriteScriptSetupToReact(script: string): { body: string[]; imports: string[] } {
  const result = parseSync('script.ts', script, { lang: 'ts', sourceType: 'module' })
  if (result.errors?.length) {
    throw new Error(result.errors.map((e) => e.message).join('; '))
  }

  const { refNames, domRefNames, usesReactive } = collectRefInfo(script)
  const imports: string[] = []
  const body: string[] = []
  let vueImportEmitted = false

  for (const stmt of result.program.body ?? []) {
    if (stmt.type === 'ImportDeclaration') {
      const line = slice(script, stmt.start!, stmt.end!)
      if (line.includes('nuxt/app')) {
        imports.push(rewriteNuxtImports(line))
      } else if (line.includes("'vue'") || line.includes('"vue"')) {
        if (!vueImportEmitted) {
          imports.push(rewriteVueImport(usesReactive))
          vueImportEmitted = true
        }
      } else {
        imports.push(line)
      }
      continue
    }

    if (stmt.type === 'VariableDeclaration') {
      if (stmt.kind === 'let') {
        body.push(
          rewriteStateAssignment(
            rewriteNuxtInBody(
              rewriteValueAccess(slice(script, stmt.start!, stmt.end!), refNames, domRefNames),
            ),
            refNames,
            domRefNames,
          ),
        )
        continue
      }
      if (stmt.kind === 'const') {
        for (const decl of stmt.declarations) {
          if (decl.id?.type !== 'Identifier') {
            body.push(rewriteValueAccess(slice(script, stmt.start!, stmt.end!), refNames, domRefNames))
            continue
          }
          const name = decl.id.name
          const init = decl.init
          if (init?.type === 'CallExpression' && init.callee?.type === 'Identifier') {
            if (init.callee.name === 'ref') {
              body.push(emitRefBinding(script, name, init.arguments?.[0]))
              continue
            }
            if (init.callee.name === 'computed') {
              body.push(emitComputedBinding(script, name, init, refNames, domRefNames))
              continue
            }
            if (init.callee.name === 'reactive') {
              body.push(emitReactiveBinding(script, name, init))
              continue
            }
          }
          const line = formatConstDecl(script, stmt, decl)
          body.push(
            rewriteStateAssignment(
              rewriteNuxtInBody(rewriteValueAccess(line, refNames, domRefNames)),
              refNames,
              domRefNames,
            ),
          )
        }
        continue
      }
    }

    if (stmt.type === 'FunctionDeclaration' && stmt.id?.type === 'Identifier') {
      const params = (stmt.params ?? []).map((p: any) => paramText(script, p)).join(', ')
      const fnBody = stmt.body?.start != null ? slice(script, stmt.body.start, stmt.body.end) : '{}'
      const fnKw = stmt.async ? 'async function' : 'function'
      body.push(
        rewriteStateAssignment(
          rewriteNuxtInBody(
            rewriteValueAccess(`${fnKw} ${stmt.id.name}(${params}) ${fnBody}`, refNames, domRefNames),
          ),
          refNames,
          domRefNames,
        ),
      )
      continue
    }

    if (stmt.type === 'ExpressionStatement') {
      const expr = stmt.expression
      if (expr?.type === 'CallExpression' && expr.callee?.type === 'Identifier') {
        if (['onMounted', 'onBeforeUnmount', 'watch'].includes(expr.callee.name)) {
          body.push(rewriteLifecycleCall(script, expr, refNames, domRefNames))
          continue
        }
      }
    }

    if (stmt.type === 'TSTypeAliasDeclaration' || stmt.type === 'TSInterfaceDeclaration') {
      body.push(slice(script, stmt.start!, stmt.end!))
      continue
    }

    if (stmt.start != null && stmt.end != null) {
      body.push(
        rewriteStateAssignment(
          rewriteNuxtInBody(
            rewriteValueAccess(slice(script, stmt.start, stmt.end), refNames, domRefNames),
          ),
          refNames,
          domRefNames,
        ),
      )
    }
  }

  return { body, imports }
}
