/**
 * Best-effort React hooks body → Svelte 5 runes for product convert script blocks.
 */

const SETTER_RE = /^set([A-Z].*)$/

function stateNameFromSetter(setter: string): string | null {
  const m = setter.match(SETTER_RE)
  if (!m) return null
  const rest = m[1]!
  return rest.charAt(0).toLowerCase() + rest.slice(1)
}

/** Skip `useRef<…>(` type args with nested `>` via depth count (ignore `=>`). */
function skipGenericArgs(source: string, i: number): number {
  if (source[i] !== '<') return i
  let depth = 0
  while (i < source.length) {
    if (source[i] === '=' && source[i + 1] === '>') {
      i += 2
      continue
    }
    const ch = source[i]!
    if (ch === '<') depth += 1
    else if (ch === '>') {
      depth -= 1
      if (depth === 0) return i + 1
    }
    i += 1
  }
  return i
}

function readCallArg(source: string, openParen: number): { arg: string; end: number } {
  let i = openParen + 1
  let depth = 1
  let inStr: string | null = null
  let escaped = false
  const start = i
  while (i < source.length && depth > 0) {
    const ch = source[i]!
    if (inStr) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === inStr) inStr = null
      i += 1
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inStr = ch
      i += 1
      continue
    }
    if (ch === '(' || ch === '[' || ch === '{') depth += 1
    else if (ch === ')' || ch === ']' || ch === '}') {
      depth -= 1
      if (depth === 0) break
    }
    i += 1
  }
  return { arg: source.slice(start, i).trim(), end: i + 1 }
}

/** Rewrite `useMemo(() => expr, [deps])` → `$derived(expr)` with balanced parens. */
function rewriteUseMemoCalls(source: string): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const idx = source.indexOf('useMemo(', i)
    if (idx === -1) {
      out += source.slice(i)
      break
    }
    out += `${source.slice(i, idx)}$derived(`
    i = idx + 'useMemo('.length

    const argsStart = i
    let depth = 1
    let inStr: string | null = null
    let escaped = false
    let commaAtDepth1 = -1
    while (i < source.length && depth > 0) {
      const ch = source[i]!
      if (inStr) {
        if (escaped) escaped = false
        else if (ch === '\\') escaped = true
        else if (ch === inStr) inStr = null
        i += 1
        continue
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = ch
        i += 1
        continue
      }
      if (ch === '(' || ch === '[' || ch === '{') depth += 1
      else if (ch === ')' || ch === ']' || ch === '}') {
        depth -= 1
        if (depth === 0) break
      } else if (ch === ',' && depth === 1 && commaAtDepth1 < 0) {
        commaAtDepth1 = i
      }
      i += 1
    }

    const closeParen = i
    const factory =
      commaAtDepth1 >= 0 ? source.slice(argsStart, commaAtDepth1).trimEnd() : source.slice(argsStart, closeParen)
    const arrowExpr = factory.match(/^\(\)\s*=>\s*([\s\S]+)$/)
    out += arrowExpr ? arrowExpr[1]!.trim() : factory
    out += ')'
    i = closeParen + 1
  }
  return out
}

function rewriteUseEffectCalls(source: string): string {
  return source.replace(/\buseEffect\s*\(/g, '$effect(').replace(/,\s*\[[^\]]*\]\s*\)/g, ')')
}

function rewriteUseStateDecls(source: string): { code: string; setters: Set<string> } {
  const setters = new Set<string>()
  let out = ''
  let i = 0
  const re = /\bconst\s*\[\s*([A-Za-z_$][\w$]*)\s*,\s*([A-Za-z_$][\w$]*)\s*\]\s*=\s*useState/g
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) {
    out += source.slice(i, m.index)
    const name = m[1]!
    const setter = m[2]!
    setters.add(setter)
    let j = m.index + m[0].length
    j = skipGenericArgs(source, j)
    while (j < source.length && /\s/.test(source[j]!)) j += 1
    if (source[j] !== '(') {
      out += m[0]
      i = m.index + m[0].length
      continue
    }
    const { arg, end } = readCallArg(source, j)
    let k = end
    if (source[k] === ';') k += 1
    out += `let ${name} = $state(${arg})`
    i = k
    re.lastIndex = i
  }
  out += source.slice(i)
  return { code: out, setters }
}

function rewriteSetterCalls(source: string, setters: Set<string>): string {
  if (!setters.size) return source
  let out = ''
  let i = 0
  while (i < source.length) {
    const rest = source.slice(i)
    const m = rest.match(/^\b(set[A-Z][\w$]*)\s*\(/)
    if (!m || !setters.has(m[1]!)) {
      out += source[i]
      i += 1
      continue
    }
    const setter = m[1]!
    const name = stateNameFromSetter(setter)
    const open = i + m[0].length - 1
    const { arg, end } = readCallArg(source, open)
    if (!name) {
      out += source.slice(i, end)
      i = end
      continue
    }
    const trimmed = arg.trim()
    if (/^[A-Za-z_$][\w$]*\s*=>/.test(trimmed) || /^\([^)]*\)\s*=>/.test(trimmed)) {
      out += `${name} = (${trimmed})(${name})`
    } else {
      out += `${name} = ${trimmed}`
    }
    i = end
  }
  return out
}

function rewriteUseRef(source: string): string {
  let out = ''
  let i = 0
  const re = /\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*useRef/g
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) {
    out += source.slice(i, m.index)
    const name = m[1]!
    let j = m.index + m[0].length
    j = skipGenericArgs(source, j)
    while (j < source.length && /\s/.test(source[j]!)) j += 1
    if (source[j] !== '(') {
      out += m[0]
      i = m.index + m[0].length
      continue
    }
    const { arg, end } = readCallArg(source, j)
    let k = end
    if (source[k] === ';') k += 1
    out += `let ${name} = $state(${arg})`
    i = k
    re.lastIndex = i
  }
  out += source.slice(i)
  // Drop `.current` on former refs (DOM / mutable boxes).
  return out.replace(/\.current\b/g, '')
}

function stripReactImports(source: string): string {
  return source
    .replace(/^import\s+[^;]*\s+from\s+['"]react['"]\s*;?\s*\n?/gm, '')
    .replace(/^import\s+type\s+[^;]*\s+from\s+['"]react['"]\s*;?\s*\n?/gm, '')
    .replace(/^'use client'\s*;?\s*\n?/gm, '')
}

/**
 * Transform React-shaped script (from rewriteScriptSetupToReact) into Svelte 5 runes.
 */
export function reactHooksToSvelteRunes(source: string): string {
  let out = stripReactImports(source)
  const state = rewriteUseStateDecls(out)
  out = state.code
  out = rewriteUseMemoCalls(out)
  out = rewriteUseEffectCalls(out)
  out = rewriteUseRef(out)
  out = rewriteSetterCalls(out, state.setters)
  out = out.replace(/\buseCallback\s*\(\s*([\s\S]*?)\s*,\s*\[[^\]]*\]\s*\)/g, '$1')
  out = out.replace(/\buseCallback\s*\(/g, '(')
  out = out.replace(/\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*\$derived\(/g, 'let $1 = $derived(')
  return out
}

export function reactScriptPartToSvelte(script: {
  imports: string[]
  body: string[]
  propsType?: string
  propNames?: string[]
  emitFields?: string[]
  emitHandlers?: string[]
}): {
  imports: string[]
  body: string[]
  propsType?: string
  propNames?: string[]
  emitFields?: string[]
  emitHandlers?: string[]
} {
  const imports = script.imports
    .filter((line) => !/\bfrom\s+['"]react['"]/.test(line))
    .filter((line) => !/\bfrom\s+['"]react\//.test(line))
    .map((line) =>
      line
        .replace(/from\s+['"]next\/navigation['"]/, "from '@/lib/svelte-navigation'")
        .replace(/from\s+['"]next\/link['"]/, "from '@/lib/svelte-link'"),
    )
  const kept: string[] = []
  for (const line of script.body) {
    const lazyImport = line.match(
      /^\s*const\s+(\w+)\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\s*\(\s*(['"])([^'"]+)\2\s*\)\s*\)\s*$/,
    )
    if (lazyImport) {
      imports.push(`import ${lazyImport[1]} from '${lazyImport[3]}'`)
      continue
    }
    kept.push(line)
  }
  // Transform the whole script body at once so useState setters are visible to later calls.
  const rewritten = reactHooksToSvelteRunes(kept.join('\n'))
  const body = rewritten.length ? rewritten.split('\n') : []
  const joined = [...imports, ...body].join('\n')
  if (/\buseId\s*\(/.test(joined) && !joined.includes('svelte-react-shims')) {
    imports.unshift("import { useId } from '@/lib/svelte-react-shims'")
  }
  if (/\buseReactive\s*[<(]/.test(joined) && !joined.includes('vue-reactivity-shim')) {
    imports.unshift("import { useReactive } from '@/lib/vue-reactivity-shim'")
  }
  return {
    ...script,
    imports,
    body,
  }
}
