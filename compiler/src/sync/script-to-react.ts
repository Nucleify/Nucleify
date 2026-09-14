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
  letRefNames: Set<string>
  usesReactive: boolean
} {
  const refNames = new Set<string>()
  const domRefNames = new Set<string>()
  const letRefNames = new Set<string>()
  let usesReactive = false
  const result = parseSync('script.ts', script, { lang: 'ts', sourceType: 'module' })
  for (const stmt of result.program.body ?? []) {
    if (stmt.type === 'VariableDeclaration' && stmt.kind === 'let') {
      for (const decl of stmt.declarations ?? []) {
        if (decl.id?.type !== 'Identifier') continue
        if (decl.init == null) letRefNames.add(decl.id.name)
      }
      continue
    }
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
  return { refNames, domRefNames, letRefNames, usesReactive }
}

/** Collect reactive binding names for template parsing (no `.value` wrapping). */
export function extractReactiveNames(script: string): Set<string> {
  return collectRefInfo(script).refNames
}

function rewriteLetRefAccess(source: string, letRefNames: Set<string>): string {
  if (letRefNames.size === 0) return source
  let out = source
  for (const name of letRefNames) {
    const guard = `__LETREF_${name}__`
    out = out.replaceAll(new RegExp(`\\b${name}\\.current\\b`, 'g'), guard)
    out = out.replaceAll(new RegExp(`\\b${name}\\?\\.`, 'g'), `${name}.current?.`)
    out = out.replaceAll(new RegExp(`\\b${name}\\.`, 'g'), `${name}.current.`)
    out = out.replaceAll(new RegExp(guard, 'g'), `${name}.current`)
  }
  out = out.replace(/\.current\.current/g, '.current')
  for (const name of letRefNames) {
    out = out.replace(
      new RegExp(`(?<![.\\w])${name}\\b(?!\\.current\\b)(?!\\s*=)`, 'g'),
      `${name}.current`,
    )
  }
  return out
}

function rewriteValueAccess(
  source: string,
  refNames: Set<string>,
  domRefNames: Set<string>,
  letRefNames: Set<string> = new Set(),
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
  return rewriteLetRefAccess(out, letRefNames)
}

function rewriteNuxtInBody(line: string): string {
  return line
    .replace(/\buseRoute\(\)/g, 'useParams()')
    .replace(/\broute\.params\./g, 'params.')
    .replace(/\bconst route\b/g, 'const params')
}

function rewriteStateAssignment(
  line: string,
  refNames: Set<string>,
  domRefNames: Set<string>,
  letRefNames: Set<string> = new Set(),
): string {
  let out = line
  for (const name of letRefNames) {
    out = out.replace(new RegExp(`\\b${name}\\s*=\\s*([^;\\n]+)`, 'g'), `${name}.current = $1`)
  }
  for (const name of refNames) {
    if (domRefNames.has(name) || letRefNames.has(name)) continue
    const setter = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`
    out = out.replace(new RegExp(`\\b${name}\\s*=\\s*([^;\\n]+)`, 'g'), `${setter}($1)`)
  }
  return out
}

function emitLetRefBinding(script: string, decl: any): string {
  const name = decl.id.name as string
  const ann = decl.id.typeAnnotation
  const typeParam =
    ann?.type === 'TSTypeAnnotation' && ann.typeAnnotation?.start != null
      ? slice(script, ann.typeAnnotation.start, ann.typeAnnotation.end)
      : 'unknown'
  return `const ${name} = useRef<${typeParam}>(undefined)`
}

function formatConstDecl(script: string, stmt: any, decl: any): string {
  const idStart = decl.id?.start ?? decl.start
  const end = decl.end ?? stmt.end
  const prefix = stmt.kind === 'const' ? 'const ' : stmt.kind === 'let' ? 'let ' : ''
  return prefix + slice(script, idStart, end)
}

function rewriteNuxtImports(line: string): string {
  if (!line.includes('nuxt/app')) return line
  return /\buseRoute\b/.test(line) ? "import { useParams } from 'next/navigation'" : ''
}

function typeArgFromCall(call: any): any {
  return call?.typeArguments?.params?.[0] ?? call?.typeParameters?.params?.[0]
}

function onHandlerName(event: string): string {
  return `on${event.charAt(0).toUpperCase()}${event.slice(1)}`
}

function memberKeyName(member: any): string | null {
  const key = member?.key
  if (!key) return null
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}

function parseDefineProps(script: string, call: any): { typeLiteral: string; names: string[] } | null {
  const typeArg = typeArgFromCall(call)
  if (typeArg?.start == null || typeArg?.end == null) return null
  const names: string[] = []
  for (const member of typeArg.members ?? []) {
    const name = memberKeyName(member)
    if (name) names.push(name)
  }
  return { typeLiteral: slice(script, typeArg.start, typeArg.end), names }
}

function parseDefineEmits(
  script: string,
  call: any,
): { event: string; handler: string; field: string }[] {
  const typeArg = typeArgFromCall(call)
  const out: { event: string; handler: string; field: string }[] = []
  for (const member of typeArg?.members ?? []) {
    const event = memberKeyName(member)
    if (!event) continue
    const handler = onHandlerName(event)
    const ann = member.typeAnnotation?.typeAnnotation
    let payload = '() => void'
    if (ann?.start != null && ann?.end != null) {
      const raw = slice(script, ann.start, ann.end).trim()
      payload =
        raw.startsWith('[') && raw.endsWith(']')
          ? `(${raw.slice(1, -1)}) => void`
          : `(...args: ${raw}) => void`
    }
    out.push({ event, handler, field: `${handler}?: ${payload}` })
  }
  return out
}

export type ScriptToReactResult = {
  body: string[]
  imports: string[]
  propsType?: string
  propNames: string[]
  emitFields: string[]
  emitHandlers: string[]
}

function rewriteVueImport(needsReactive: boolean, needsLazy = false, needsUseId = false): string {
  const hooks = ['useEffect', 'useMemo', 'useRef', 'useState']
  if (needsUseId) hooks.push('useId')
  if (needsLazy) hooks.push('lazy', 'Suspense')
  const lines = [`import { ${hooks.join(', ')} } from 'react'`]
  if (needsReactive) lines.push(`import { useReactive } from '@/lib/vue-reactivity-shim'`)
  return lines.join('\n')
}

function emitRefBinding(source: string, name: string, init: any): string {
  const initText =
    init?.start != null && init?.end != null ? slice(source, init.start, init.end) : 'null'
  if (isDomRef(source, name, init)) {
    const typeMatch = source.match(new RegExp(`const ${name} = ref<([^>]+)>`))
    let typeParam = typeMatch?.[1] ?? 'HTMLElement | null'
    if (/\bHTMLElement\b/.test(typeParam) && !/\bHTML[A-Z]/.test(typeParam.replace('HTMLElement', ''))) {
      typeParam = typeParam.replace(/\bHTMLElement\b/, 'HTMLDivElement')
    }
    return `const ${name} = useRef<${typeParam}>(${initText === 'null' ? 'null' : initText})`
  }
  const setter = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return `const [${name}, ${setter}] = useState(${initText})`
}

function unwrapArrowBody(body: string): string {
  const trimmed = body.trim()
  const match = trimmed.match(
    /^(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)(?:\s*:\s*[^=]+?)?\s*=>\s*([\s\S]+)$/,
  )
  if (match) return match[1]!.trim()
  return trimmed
}

function emitComputedBinding(
  source: string,
  name: string,
  init: any,
  refNames: Set<string>,
  domRefNames: Set<string>,
  letRefNames: Set<string>,
): string {
  const arg = init.arguments?.[0]
  let body = 'undefined'
  if (arg?.start != null && arg?.end != null) body = slice(source, arg.start, arg.end)
  body = unwrapArrowBody(body)
  body = rewriteNuxtInBody(rewriteValueAccess(body, refNames, domRefNames, letRefNames))
  // Extract only refs that are actually referenced in the computed body
  const deps = [...refNames]
    .filter((n) => n !== name && !domRefNames.has(n) && new RegExp(`\\b${n}\\b`).test(body))
    .join(', ')
  return `const ${name} = useMemo(() => ${body}, [${deps}])`
}

function emitReactiveBinding(source: string, name: string, init: any, decl: any): string {
  const initText =
    init?.arguments?.[0]?.start != null
      ? slice(source, init.arguments[0].start, init.arguments[0].end)
      : '{}'
  const typeParams = init.typeArguments?.params ?? init.typeParameters?.params
  const typeArg =
    typeParams?.[0]?.start != null && typeParams[0].end != null
      ? slice(source, typeParams[0].start, typeParams[0].end)
      : ''
  const generic = typeArg ? `<${typeArg}>` : ''
  return `const ${name} = useReactive${generic}(${initText})`
}

function rewriteLifecycleCall(
  source: string,
  node: any,
  refNames: Set<string>,
  domRefNames: Set<string>,
  letRefNames: Set<string>,
): string {
  const callee = node.callee?.name
  const arg = node.arguments?.[0]
  if (!arg) {
    return rewriteValueAccess(slice(source, node.start, node.end), refNames, domRefNames, letRefNames)
  }

  if (callee === 'onMounted') {
    const fnText =
      arg.start != null && arg.end != null ? slice(source, arg.start, arg.end) : '() => {}'
    const body = rewriteStateAssignment(
      rewriteNuxtInBody(rewriteValueAccess(fnText, refNames, domRefNames, letRefNames)),
      refNames,
      domRefNames,
      letRefNames,
    )
    return `useEffect(() => {\n  void (${body})()\n}, [])`
  }

  if (callee === 'onBeforeUnmount') {
    const fnText =
      arg.start != null && arg.end != null ? slice(source, arg.start, arg.end) : '() => {}'
    const body = rewriteStateAssignment(
      rewriteNuxtInBody(rewriteValueAccess(fnText, refNames, domRefNames, letRefNames)),
      refNames,
      domRefNames,
      letRefNames,
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
      rewriteNuxtInBody(rewriteValueAccess(cbText, refNames, domRefNames, letRefNames)),
      refNames,
      domRefNames,
      letRefNames,
    )
    const deps = rewriteNuxtInBody(
      rewriteValueAccess(srcText, refNames, domRefNames, letRefNames),
    )
    return `useEffect(() => {\n  void (${cbText})(${deps})\n}, [${deps}])`
  }

  return rewriteValueAccess(slice(source, node.start, node.end), refNames, domRefNames, letRefNames)
}

/**
 * Rewrite `<script setup>` to React hooks + statements (product convert).
 */
export function rewriteScriptSetupToReact(script: string): ScriptToReactResult {
  const result = parseSync('script.ts', script, { lang: 'ts', sourceType: 'module' })
  if (result.errors?.length) {
    throw new Error(result.errors.map((e) => e.message).join('; '))
  }

  const { refNames, domRefNames, letRefNames, usesReactive } = collectRefInfo(script)
  const usesLazy = /\bdefineAsyncComponent\b/.test(script)
  const usesUseId = /\buseId\s*\(/.test(script)
  const imports: string[] = []
  const body: string[] = []
  let vueImportEmitted = false
  let propsType: string | undefined
  const propNames: string[] = []
  const emitFields: string[] = []
  const emitHandlers: string[] = []

  function captureProps(call: any): boolean {
    const parsed = parseDefineProps(script, call)
    if (!parsed) return false
    propsType = parsed.typeLiteral
    propNames.push(...parsed.names)
    return true
  }

  function captureEmits(call: any): void {
    for (const item of parseDefineEmits(script, call)) {
      emitFields.push(item.field)
      emitHandlers.push(item.handler)
    }
  }

  for (const stmt of result.program.body ?? []) {
    if (stmt.type === 'ImportDeclaration') {
      const line = slice(script, stmt.start!, stmt.end!)
      if (line.includes('nuxt/app')) {
        const rewritten = rewriteNuxtImports(line)
        if (rewritten) imports.push(rewritten)
      } else if (line.includes("'vue'") || line.includes('"vue"')) {
        if (!vueImportEmitted) {
          imports.push(rewriteVueImport(usesReactive, usesLazy, usesUseId))
          vueImportEmitted = true
        }
      } else {
        imports.push(line)
      }
      continue
    }

    if (stmt.type === 'VariableDeclaration') {
      if (stmt.kind === 'let') {
        for (const decl of stmt.declarations ?? []) {
          if (decl.id?.type !== 'Identifier') continue
          if (decl.init == null) {
            body.push(emitLetRefBinding(script, decl))
            continue
          }
          body.push(
            rewriteStateAssignment(
              rewriteNuxtInBody(
                rewriteValueAccess(
                  formatConstDecl(script, stmt, decl),
                  refNames,
                  domRefNames,
                  letRefNames,
                ),
              ),
              refNames,
              domRefNames,
              letRefNames,
            ),
          )
        }
        continue
      }
      if (stmt.kind === 'const') {
        for (const decl of stmt.declarations) {
          if (decl.id?.type !== 'Identifier') {
            body.push(
              rewriteValueAccess(slice(script, stmt.start!, stmt.end!), refNames, domRefNames, letRefNames),
            )
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
              body.push(emitComputedBinding(script, name, init, refNames, domRefNames, letRefNames))
              continue
            }
            if (init.callee.name === 'reactive') {
              body.push(emitReactiveBinding(script, name, init, decl))
              continue
            }
            if (init.callee.name === 'defineAsyncComponent') {
              const arg = init.arguments?.[0]
              const loader =
                arg?.start != null && arg?.end != null
                  ? rewriteValueAccess(
                      slice(script, arg.start, arg.end),
                      refNames,
                      domRefNames,
                      letRefNames,
                    )
                  : '() => Promise.resolve({ default: () => null })'
              body.push(`const ${name} = lazy(${loader})`)
              continue
            }
            if (init.callee.name === 'defineProps') {
              captureProps(init)
              continue
            }
            if (init.callee.name === 'defineEmits') {
              captureEmits(init)
              continue
            }
          }
          const line = formatConstDecl(script, stmt, decl)
          body.push(
            rewriteStateAssignment(
              rewriteNuxtInBody(rewriteValueAccess(line, refNames, domRefNames, letRefNames)),
              refNames,
              domRefNames,
              letRefNames,
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
            rewriteValueAccess(
              `${fnKw} ${stmt.id.name}(${params}) ${fnBody}`,
              refNames,
              domRefNames,
              letRefNames,
            ),
          ),
          refNames,
          domRefNames,
          letRefNames,
        ),
      )
      continue
    }

    if (stmt.type === 'ExpressionStatement') {
      const expr = stmt.expression
      if (expr?.type === 'CallExpression' && expr.callee?.type === 'Identifier') {
        if (expr.callee.name === 'useSeoMeta') continue
        if (expr.callee.name === 'defineProps') {
          captureProps(expr)
          continue
        }
        if (expr.callee.name === 'defineEmits') {
          captureEmits(expr)
          continue
        }
        if (['onMounted', 'onBeforeUnmount', 'watch'].includes(expr.callee.name)) {
          body.push(rewriteLifecycleCall(script, expr, refNames, domRefNames, letRefNames))
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
            rewriteValueAccess(slice(script, stmt.start, stmt.end), refNames, domRefNames, letRefNames),
          ),
          refNames,
          domRefNames,
          letRefNames,
        ),
      )
    }
  }

  if (usesLazy && !imports.some((line) => /\blazy\b/.test(line))) {
    imports.unshift("import { lazy, Suspense } from 'react'")
  }
  if (usesUseId && !imports.some((line) => /\buseId\b/.test(line))) {
    imports.unshift("import { useId } from 'react'")
  }

  return { body, imports, propsType, propNames, emitFields, emitHandlers }
}
