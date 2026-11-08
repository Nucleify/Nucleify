/** Token kinds for marketing compiler emit snippets (no Shiki dependency). */
export type SnippetTokenKind =
  | 'plain'
  | 'kw'
  | 'str'
  | 'type'
  | 'fn'
  | 'tag'
  | 'attr'
  | 'comment'
  | 'punct'
  | 'num'

export type SnippetToken = {
  kind: SnippetTokenKind
  text: string
}

const KEYWORDS = new Set([
  'import',
  'export',
  'from',
  'const',
  'let',
  'var',
  'function',
  'return',
  'type',
  'interface',
  'default',
  'async',
  'await',
  'as',
  'of',
  'in',
  'if',
  'else',
  'true',
  'false',
  'null',
  'undefined',
  'new',
  'this',
  'typeof',
  'extends',
  'props',
  'setup',
  'lang',
  'script',
  'template',
  'style',
  'component',
  'state',
  'derived',
  'handler',
  'name',
])

const TYPES = new Set([
  'string',
  'number',
  'boolean',
  'Props',
  'InboxBadge',
  'NuiButton',
])

const BUILTINS = new Set([
  'useState',
  'useMemo',
  'useCallback',
  'usePathname',
  'ref',
  'computed',
  'defineProps',
  'createSignal',
  'createMemo',
  'Astro',
  '$props',
  '$state',
  '$derived',
])

function pushPlain(out: SnippetToken[], text: string): void {
  if (!text) return
  const last = out[out.length - 1]
  if (last?.kind === 'plain') {
    last.text += text
    return
  }
  out.push({ kind: 'plain', text })
}

function classifyIdent(name: string): SnippetTokenKind {
  if (KEYWORDS.has(name)) return 'kw'
  if (TYPES.has(name) || /^[A-Z]/.test(name)) return 'type'
  if (BUILTINS.has(name) || name.startsWith('$')) return 'fn'
  return 'plain'
}

function readString(source: string, start: number): number {
  const quote = source[start]!
  let j = start + 1
  while (j < source.length) {
    if (source[j] === '\\') {
      j += 2
      continue
    }
    if (source[j] === quote) return j + 1
    j += 1
  }
  return source.length
}

function tokenizeMarkup(inner: string): SnippetToken[] {
  const out: SnippetToken[] = []
  let i = 0
  let sawName = false

  while (i < inner.length) {
    const ch = inner[i]!

    if (/\s/.test(ch)) {
      let j = i + 1
      while (j < inner.length && /\s/.test(inner[j]!)) j += 1
      pushPlain(out, inner.slice(i, j))
      i = j
      continue
    }

    if (ch === '/' || ch === '>') {
      out.push({ kind: 'punct', text: ch })
      i += 1
      continue
    }

    if (ch === '=') {
      out.push({ kind: 'punct', text: '=' })
      i += 1
      continue
    }

    if (ch === '"' || ch === "'") {
      const end = readString(inner, i)
      out.push({ kind: 'str', text: inner.slice(i, end) })
      i = end
      continue
    }

    if (ch === '{') {
      let depth = 1
      let j = i + 1
      while (j < inner.length && depth > 0) {
        if (inner[j] === '{') depth += 1
        else if (inner[j] === '}') depth -= 1
        j += 1
      }
      // Skip outer braces; highlight expression inside.
      out.push({ kind: 'punct', text: '{' })
      out.push(...highlightSnippetLine(inner.slice(i + 1, j - 1)))
      out.push({ kind: 'punct', text: '}' })
      i = j
      continue
    }

    if (/[A-Za-z_$@]/.test(ch)) {
      let j = i + 1
      while (j < inner.length && /[\w$@.-]/.test(inner[j]!)) j += 1
      const ident = inner.slice(i, j)
      let k = j
      while (k < inner.length && /\s/.test(inner[k]!)) k += 1
      const kind: SnippetTokenKind = !sawName
        ? 'tag'
        : inner[k] === '='
          ? 'attr'
          : classifyIdent(ident)
      sawName = true
      out.push({ kind, text: ident })
      i = j
      continue
    }

    out.push({ kind: 'punct', text: ch })
    i += 1
  }

  return out
}

/**
 * Lightweight line highlighter for home compiler emit board.
 * Covers TS/JSX, Vue SFC tags, Svelte runes, and Astro fences.
 */
export function highlightSnippetLine(line: string): SnippetToken[] {
  if (!line) return [{ kind: 'plain', text: ' ' }]

  const trimmed = line.trim()
  if (trimmed === '---') return [{ kind: 'punct', text: line }]
  if (trimmed.startsWith('<!--') || trimmed.startsWith('//')) {
    return [{ kind: 'comment', text: line }]
  }

  const out: SnippetToken[] = []
  let i = 0

  while (i < line.length) {
    const ch = line[i]!

    if (ch === '<' && /[A-Za-z/!]/.test(line[i + 1] ?? '')) {
      const close = line.indexOf('>', i)
      const end = close === -1 ? line.length : close + 1
      const chunk = line.slice(i, end)
      const hasClose = chunk.endsWith('>')
      const inner = chunk.slice(1, hasClose ? -1 : undefined)
      out.push({ kind: 'punct', text: '<' })
      out.push(...tokenizeMarkup(inner))
      if (hasClose) out.push({ kind: 'punct', text: '>' })
      i = end
      continue
    }

    if (ch === '"' || ch === "'") {
      const end = readString(line, i)
      out.push({ kind: 'str', text: line.slice(i, end) })
      i = end
      continue
    }

    if (ch === '`') {
      let j = i + 1
      while (j < line.length && line[j] !== '`') j += 1
      if (j < line.length) j += 1
      out.push({ kind: 'str', text: line.slice(i, j) })
      i = j
      continue
    }

    if (/\d/.test(ch) && (i === 0 || !/[\w$]/.test(line[i - 1]!))) {
      let j = i + 1
      while (j < line.length && /[\d._]/.test(line[j]!)) j += 1
      out.push({ kind: 'num', text: line.slice(i, j) })
      i = j
      continue
    }

    if (/[A-Za-z_$@]/.test(ch)) {
      let j = i + 1
      while (j < line.length && /[\w$]/.test(line[j]!)) j += 1
      const ident = line.slice(i, j)
      let kind = classifyIdent(ident)
      if (kind === 'plain') {
        let k = j
        while (k < line.length && /\s/.test(line[k]!)) k += 1
        if (line[k] === '(') kind = 'fn'
      }
      out.push({ kind, text: ident })
      i = j
      continue
    }

    if ('{}[]().,;:?!|&<>+-*/%='.includes(ch)) {
      out.push({ kind: 'punct', text: ch })
      i += 1
      continue
    }

    pushPlain(out, ch)
    i += 1
  }

  return out.length ? out : [{ kind: 'plain', text: line }]
}
