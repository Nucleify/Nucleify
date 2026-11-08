/** Token kinds for stack shell command snippets. */
export type CmdTokenKind =
  | 'bin'
  | 'cmd'
  | 'flag'
  | 'key'
  | 'op'
  | 'val'
  | 'path'
  | 'plain'

export type CmdToken = {
  kind: CmdTokenKind
  text: string
}

const BINS = new Set(['make', 'nuc', 'pnpm', 'npm', 'npx', 'yarn'])

/**
 * Lightweight highlighter for stack command rows
 * (`make web --target=next`, `nuc emit ./Button.vue --target=next`).
 */
export function highlightCommand(command: string): CmdToken[] {
  const out: CmdToken[] = []
  const parts = command.match(/(\s+|[^\s]+)/g)
  if (!parts) return [{ kind: 'plain', text: command }]

  let index = 0
  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      out.push({ kind: 'plain', text: part })
      continue
    }

    if (index === 0 && BINS.has(part)) {
      out.push({ kind: 'bin', text: part })
      index += 1
      continue
    }

    if (/^--?[a-zA-Z][\w-]*$/.test(part)) {
      out.push({ kind: 'flag', text: part })
      index += 1
      continue
    }

    if (/^[A-Z][A-Z0-9_]*=/.test(part)) {
      const eq = part.indexOf('=')
      out.push({ kind: 'key', text: part.slice(0, eq) })
      out.push({ kind: 'op', text: '=' })
      out.push({ kind: 'val', text: part.slice(eq + 1) })
      index += 1
      continue
    }

    if (part.startsWith('--') && part.includes('=')) {
      const eq = part.indexOf('=')
      out.push({ kind: 'flag', text: part.slice(0, eq) })
      out.push({ kind: 'op', text: '=' })
      const value = part.slice(eq + 1)
      out.push({
        kind: looksLikePath(value) ? 'path' : 'val',
        text: value,
      })
      index += 1
      continue
    }

    if (looksLikePath(part)) {
      out.push({ kind: 'path', text: part })
      index += 1
      continue
    }

    if (index === 1) {
      out.push({ kind: 'cmd', text: part })
      index += 1
      continue
    }

    out.push({ kind: 'plain', text: part })
    index += 1
  }

  return out
}

function looksLikePath(text: string): boolean {
  return (
    text.startsWith('./') ||
    text.startsWith('../') ||
    text.startsWith('/') ||
    /\.[a-zA-Z0-9]+$/.test(text)
  )
}
