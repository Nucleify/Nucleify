/**
 * Best-effort React TSX → Solid TSX for product convert (Tryb B).
 * Complex React / Next patterns need follow-up; admin stubs convert cleanly.
 */
export function reactTsxToSolidBody(reactBody: string): string {
  let body = reactBody.replace(/^'use client'\s*;?\s*\n+/m, '')

  const signals = new Set<string>()
  body = body.replace(
    /const \[(\w+),\s*(set\w+)\]\s*=\s*useState\(/g,
    (_m, name: string, setter: string) => {
      signals.add(name)
      return `const [${name}, ${setter}] = createSignal(`
    },
  )

  body = body.replace(/\buseMemo\(/g, 'createMemo(')
  // `createMemo(() => expr, [deps])` → `createMemo(() => expr)`
  body = body.replace(/createMemo\((\(\) => [\s\S]*?)\),\s*\[[^\]]*\]\)/g, 'createMemo($1)')

  body = body.replace(/\buseEffect\(/g, 'onMount(')

  body = body.replace(
    /import\s+\{([^}]+)\}\s+from\s+['"]react['"]/g,
    (_m, raw: string) => {
      const map: Record<string, string> = {
        useState: 'createSignal',
        useMemo: 'createMemo',
        useEffect: 'onMount',
        lazy: 'lazy',
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
        if (name === 'Suspense' || name === 'StrictMode') continue
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
  body = body.replace(/\s+suppressHydrationWarning(?:=\{true\}|=\{false\}|=["'][^"']*["'])?/g, '')

  body = body.replace(/import\s+\{[^}]+\}\s+from\s+['"]next\/navigation['"]\s*\n?/g, '')
  body = body.replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"]next\/navigation['"]\s*\n?/g, '')

  for (const name of signals) {
    body = body.replace(new RegExp(`\\{${name}\\}(?!\\()`, 'g'), `{${name}()}`)
  }

  body = body.replace(/\n{3,}/g, '\n\n')
  return `${body.trim()}\n`
}
