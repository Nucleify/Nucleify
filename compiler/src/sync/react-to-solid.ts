/**
 * Best-effort React TSX → Solid TSX for product convert (Tryb B).
 * Complex React / Next patterns need follow-up; admin stubs convert cleanly.
 */

/** Rewrite `useMemo(() => expr, [deps])` → `createMemo(() => expr)` with balanced parens. */
function rewriteUseMemoCalls(source: string): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const idx = source.indexOf('useMemo(', i)
    if (idx === -1) {
      out += source.slice(i)
      break
    }
    out += `${source.slice(i, idx)}createMemo(`
    i = idx + 'useMemo('.length

    // Parse arguments of useMemo( ... ) — drop the deps array if present.
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
    out += `${factory})`
    i = closeParen + 1
  }
  return out
}

function shouldUnwrapAt(source: string, i: number, name: string): boolean {
  const after = source.slice(i + name.length)
  if (after.startsWith('(')) return false
  // Object / type property key: email?: | email:
  if (/^\s*\?:/.test(after) || /^\s*:(?!:)/.test(after)) return false
  // JSX attribute name / assignment LHS: name=  (not == / ===)
  if (/^\s*=(?!=)/.test(after)) return false
  // Property access: params.lang / state.shellsActive
  if (i > 0 && source[i - 1] === '.') return false

  const before = source.slice(0, i)
  // const [name, …] / , name]  destructure
  if (/(?:const\s*\[\s*|,\s*)$/.test(before.slice(-24))) return false
  // const name =
  if (/const\s+$/.test(before.slice(-10))) return false
  // import { … name … }
  if (/import\s*(?:type\s*)?\{[^;]*$/.test(before.slice(-120))) return false
  return true
}

/** Call Solid accessors at value sites (`name` → `name()`), skipping defs / imports / strings. */
function unwrapAccessors(source: string, names: Set<string>): string {
  if (!names.size) return source
  const sorted = [...names].sort((a, b) => b.length - a.length)

  function tryMatch(at: number): string | null {
    for (const name of sorted) {
      if (!source.startsWith(name, at)) continue
      const before = at === 0 ? '' : source[at - 1]!
      const afterCh = source[at + name.length] ?? ''
      if (/[\w$]/.test(before) || /[\w$]/.test(afterCh)) continue
      return name
    }
    return null
  }

  let out = ''
  let i = 0
  let inStr: string | null = null
  let escaped = false
  // Depth of ${…} expressions inside template literals (0 = in template string text).
  let templateExprDepth = 0

  while (i < source.length) {
    const ch = source[i]!

    if (inStr === '"' || inStr === "'") {
      out += ch
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === inStr) inStr = null
      i += 1
      continue
    }

    if (inStr === '`') {
      if (templateExprDepth === 0) {
        out += ch
        if (escaped) escaped = false
        else if (ch === '\\') escaped = true
        else if (ch === '`') {
          inStr = null
          escaped = false
        } else if (ch === '$' && source[i + 1] === '{') {
          out += '{'
          i += 2
          templateExprDepth = 1
          continue
        }
        i += 1
        continue
      }
      // Inside ${…}: may unwrap, track nested braces / strings
    }

    // Start of a string (only when not already in one, or inside template expr)
    if (!inStr || templateExprDepth > 0) {
      if ((ch === '"' || ch === "'") && !inStr) {
        // only enter quote strings when not in backtick, or when in template expr
        // handled below via unified path when templateExprDepth > 0 or !inStr
      }
    }

    if (!inStr) {
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = ch
        out += ch
        i += 1
        continue
      }

      const matched = tryMatch(i)
      if (matched && shouldUnwrapAt(source, i, matched)) {
        out += `${matched}()`
        i += matched.length
        continue
      }
      if (matched) {
        out += matched
        i += matched.length
        continue
      }
      out += ch
      i += 1
      continue
    }

    // inStr === '`' && templateExprDepth > 0
    if (ch === '"' || ch === "'") {
      // nested quote inside ${}
      const quote = ch
      out += ch
      i += 1
      let esc = false
      while (i < source.length) {
        const s = source[i]!
        out += s
        if (esc) esc = false
        else if (s === '\\') esc = true
        else if (s === quote) {
          i += 1
          break
        }
        i += 1
      }
      continue
    }
    if (ch === '`') {
      // nested template — copy until matching close with simple depth (no unwrap inside nested tpl text)
      out += ch
      i += 1
      let depth = 1
      let esc = false
      while (i < source.length && depth > 0) {
        const s = source[i]!
        out += s
        if (esc) {
          esc = false
          i += 1
          continue
        }
        if (s === '\\') {
          esc = true
          i += 1
          continue
        }
        if (s === '`') {
          depth -= 1
          i += 1
          continue
        }
        if (s === '$' && source[i + 1] === '{') {
          out += '{'
          i += 2
          let brace = 1
          while (i < source.length && brace > 0) {
            const t = source[i]!
            out += t
            if (t === '{') brace += 1
            else if (t === '}') brace -= 1
            i += 1
          }
          continue
        }
        i += 1
      }
      continue
    }
    if (ch === '{') {
      templateExprDepth += 1
      out += ch
      i += 1
      continue
    }
    if (ch === '}') {
      templateExprDepth -= 1
      out += ch
      i += 1
      continue
    }

    const matched = tryMatch(i)
    if (matched && shouldUnwrapAt(source, i, matched)) {
      out += `${matched}()`
      i += matched.length
      continue
    }
    if (matched) {
      out += matched
      i += matched.length
      continue
    }
    out += ch
    i += 1
  }
  return out
}

function ensureSolidCompatImports(body: string): string {
  const lines: string[] = []
  if (/\buseRef\b/.test(body) && !/from\s+['"]@\/lib\/react-compat['"]/.test(body)) {
    lines.push(`import { useRef } from '@/lib/react-compat'`)
  }
  if (/\buseParams\b/.test(body) && !/from\s+['"]@solidjs\/router['"]/.test(body)) {
    lines.push(`import { useParams } from '@solidjs/router'`)
  }
  if (!lines.length) return body
  const importBlock = `${lines.join('\n')}\n`
  const match = body.match(/^(?:import[\s\S]*?;\s*\n)+/)
  if (match) {
    return `${match[0]}${importBlock}${body.slice(match[0].length)}`
  }
  return `${importBlock}${body}`
}

export function reactTsxToSolidBody(reactBody: string): string {
  let body = reactBody.replace(/^'use client'\s*;?\s*\n+/m, '')

  const accessors = new Set<string>()
  body = body.replace(
    /const \[(\w+),\s*(set\w+)\]\s*=\s*useState\(/g,
    (_m, name: string, setter: string) => {
      accessors.add(name)
      return `const [${name}, ${setter}] = createSignal(`
    },
  )

  body = rewriteUseMemoCalls(body)

  for (const m of body.matchAll(/const\s+(\w+)\s*=\s*createMemo\(/g)) {
    accessors.add(m[1]!)
  }

  body = body.replace(/\buseEffect\(/g, 'onMount(')
  body = rewriteOnMountDeps(body)

  body = body.replace(
    /import\s+\{([^}]+)\}\s+from\s+['"]react['"]/g,
    (_m, raw: string) => {
      const map: Record<string, string> = {
        useState: 'createSignal',
        useMemo: 'createMemo',
        useEffect: 'onMount',
        useId: 'createUniqueId',
        lazy: 'lazy',
        Suspense: 'Suspense',
      }
      const out = new Set<string>()
      for (const part of raw.split(',')) {
        const trimmed = part.trim()
        if (!trimmed) continue
        const name = trimmed
          .replace(/^type\s+/, '')
          .split(/\s+as\s+/)
          .pop()!
          .trim()
        if (name === 'StrictMode') continue
        if (name === 'Fragment') continue
        if (name === 'ReactNode' || name === 'ReactElement') {
          out.add('JSX')
          continue
        }
        if (map[name]) out.add(map[name])
      }
      if (!out.size) return ''
      const hasJsx = out.delete('JSX')
      const values = [...out]
      if (hasJsx) values.push('type JSX')
      return `import { ${values.join(', ')} } from 'solid-js'`
    },
  )

  body = body.replace(/\bReact\.ReactNode\b/g, 'JSX.Element')
  body = body.replace(/\bclassName\b/g, 'class')
  body = body.replace(/\buseId\s*\(/g, 'createUniqueId(')
  // Solid SVG: camelCase clip/stroke attrs; stop paints need CSS style (var() in attrs is blank).
  body = foldSvgStopAttrsIntoStyle(body)
  body = body.replace(/\bclipPath=/g, 'clip-path=')
  body = body.replace(/\bstrokeLinecap=/g, 'stroke-linecap=')
  body = body.replace(/\bstrokeLinejoin=/g, 'stroke-linejoin=')
  body = body.replace(/\bcolorInterpolationFilters=/g, 'color-interpolation-filters=')
  body = body.replace(/\s+suppressHydrationWarning(?:=\{true\}|=\{false\}|=["'][^"']*["'])?/g, '')
  body = stripJsxKeyAttrs(body)

  body = body.replace(/import\s+\{[^}]+\}\s+from\s+['"]next\/navigation['"]\s*\n?/g, '')
  body = body.replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"]next\/navigation['"]\s*\n?/g, '')

  body = unwrapAccessors(body, accessors)
  body = rewriteLazyToEagerImports(body)
  body = ensureSolidCompatImports(body)
  body = ensureSuspenseImport(body)
  body = ensureCreateUniqueIdImport(body)

  body = body.replace(/\n{3,}/g, '\n\n')
  return `${body.trim()}\n`
}

/**
 * Product shells need all section panels in the DOM for scroll/rail observers.
 * `lazy` + `Suspense fallback={null}` leaves panels missing at observe time — eager-import instead.
 */
function rewriteLazyToEagerImports(source: string): string {
  const lazyRe =
    /const\s+(\w+)\s*=\s*lazy\s*\(\s*\(\s*\)\s*=>\s*import\s*\(\s*['"]([^'"]+)['"]\s*\)\s*\)/g
  const imports: string[] = []
  let body = source.replace(lazyRe, (_m, name: string, path: string) => {
    imports.push(`import ${name} from '${path}'`)
    return ''
  })
  if (!imports.length) return source
  body = body.replace(/\s*<Suspense\b[^>]*>\s*/g, '')
  body = body.replace(/\s*<\/Suspense>\s*/g, '')
  // Drop lazy from solid-js import if unused
  body = body.replace(
    /import\s+\{([^}]+)\}\s+from\s+['"]solid-js['"]/,
    (_m, raw: string) => {
      const parts = raw
        .split(',')
        .map((p: string) => p.trim())
        .filter((p: string) => p && p !== 'lazy' && p !== 'Suspense')
      if (!parts.length) return ''
      return `import { ${parts.join(', ')} } from 'solid-js'`
    },
  )
  const importBlock = `${imports.join('\n')}\n`
  const match = body.match(/^(?:import[\s\S]*?;\s*\n)+/)
  if (match) return `${match[0]}${importBlock}${body.slice(match[0].length)}`
  return `${importBlock}${body}`
}

/** Drop React dependency arrays from `onMount(fn, [deps])` → `onMount(fn)`. */
function rewriteOnMountDeps(source: string): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const idx = source.indexOf('onMount(', i)
    if (idx === -1) {
      out += source.slice(i)
      break
    }
    out += source.slice(i, idx)
    i = idx + 'onMount('.length
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
    out += `onMount(${factory})`
    i = closeParen + 1
  }
  return out
}

function ensureSuspenseImport(body: string): string {
  if (!/<Suspense\b/.test(body)) return body
  if (/import\s+\{[^}]*\bSuspense\b[^}]*\}\s+from\s+['"]solid-js['"]/.test(body)) return body
  const replaced = body.replace(
    /import\s+\{([^}]+)\}\s+from\s+['"]solid-js['"]/,
    (_m, raw: string) => `import { ${raw.trim().replace(/,\s*$/, '')}, Suspense } from 'solid-js'`,
  )
  if (replaced !== body) return replaced
  return `import { Suspense } from 'solid-js'\n${body}`
}

function ensureCreateUniqueIdImport(body: string): string {
  if (!/\bcreateUniqueId\s*\(/.test(body)) return body
  if (/import\s+\{[^}]*\bcreateUniqueId\b[^}]*\}\s+from\s+['"]solid-js['"]/.test(body)) return body
  const replaced = body.replace(
    /import\s+\{([^}]+)\}\s+from\s+['"]solid-js['"]/,
    (_m, raw: string) =>
      `import { ${raw.trim().replace(/,\s*$/, '')}, createUniqueId } from 'solid-js'`,
  )
  if (replaced !== body) return replaced
  return `import { createUniqueId } from 'solid-js'\n${body}`
}

/**
 * Chromium ignores `var(--rainbow-hue)` in SVG stop-color *presentation* attrs.
 * Fold stop-color / stop-opacity into a CSS `style` so registered @property hues paint.
 */
function foldSvgStopAttrsIntoStyle(source: string): string {
  return source.replace(/<stop\b([^>]*?)(\/>|>)/g, (_full, rawAttrs: string, close: string) => {
    let attrs: string = rawAttrs
    const color =
      attrs.match(/\bstop(?:-c|C)olor=["']([^"']*)["']/)?.[1] ??
      attrs.match(/\bstop(?:-c|C)olor=\{["']([^"']*)["']\}/)?.[1]
    const opacity =
      attrs.match(/\bstop(?:-o|O)pacity=["']([^"']*)["']/)?.[1] ??
      attrs.match(/\bstop(?:-o|O)pacity=\{["']([^"']*)["']\}/)?.[1] ??
      attrs.match(/\bstop(?:-o|O)pacity=\{([\d.]+)\}/)?.[1]

    if (!color && opacity == null) {
      attrs = attrs.replace(/\bstopColor=/g, 'stop-color=').replace(/\bstopOpacity=/g, 'stop-opacity=')
      return `<stop${attrs}${close}`
    }

    attrs = attrs
      .replace(/\s*stop(?:-c|C)olor=(?:["'][^"']*["']|\{[^}]*\})/g, '')
      .replace(/\s*stop(?:-o|O)pacity=(?:["'][^"']*["']|\{[^}]*\})/g, '')

    if (/\bstyle=/.test(attrs)) return `<stop${attrs}${close}`

    const parts: string[] = []
    if (color) parts.push(`stop-color: ${color}`)
    if (opacity != null) parts.push(`stop-opacity: ${opacity}`)
    return `<stop${attrs} style="${parts.join('; ')}"${close}`
  })
}

/** Strip React `key={...}` / `key="..."` with balanced braces (template literals OK). */
function stripJsxKeyAttrs(source: string): string {
  let out = ''
  let i = 0
  while (i < source.length) {
    const idx = source.indexOf('key=', i)
    if (idx === -1) {
      out += source.slice(i)
      break
    }
    // Only JSX attrs: whitespace or start-of-tag before key=
    if (idx > 0 && !/\s/.test(source[idx - 1]!)) {
      out += source.slice(i, idx + 4)
      i = idx + 4
      continue
    }
    out += source.slice(i, idx)
    i = idx + 4
    if (i >= source.length) break
    const ch = source[i]!
    if (ch === '"' || ch === "'") {
      const quote = ch
      i += 1
      while (i < source.length && source[i] !== quote) {
        if (source[i] === '\\') i += 1
        i += 1
      }
      i += 1 // closing quote
      continue
    }
    if (ch === '{') {
      let depth = 1
      i += 1
      let inStr: string | null = null
      let escaped = false
      while (i < source.length && depth > 0) {
        const c = source[i]!
        if (inStr) {
          if (escaped) escaped = false
          else if (c === '\\' && inStr !== '`') escaped = true
          else if (c === inStr) inStr = null
          else if (inStr === '`' && c === '$' && source[i + 1] === '{') {
            // stay in template; nested ${} tracked via depth below after skipping
            i += 1
          }
          i += 1
          continue
        }
        if (c === '"' || c === "'" || c === '`') {
          inStr = c
          i += 1
          continue
        }
        if (c === '{') depth += 1
        else if (c === '}') depth -= 1
        i += 1
      }
      continue
    }
    // bare key=ident — consume identifier
    while (i < source.length && /[\w$]/.test(source[i]!)) i += 1
  }
  return out
}
