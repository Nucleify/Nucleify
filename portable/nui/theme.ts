import { applyTheme, type Palette, type ThemeMode } from 'nucleify-ui/theme'

import './register'

export type { Palette, ThemeMode }

export type SetupNuiOptions = {
  palette: Palette
  mode?: ThemeMode
  /** When true (default), toggle `p-dark` on html/body from `mode`. */
  syncDarkClass?: boolean
}

const SHELL_CLASSES = new Set(['nuc-nuxt', 'nuc-next'])

/** Stable order: shell then `p-dark` — matches Next root layout (avoids hydration mismatch). */
function applyShellClasses(
  el: Element,
  shell: string,
  syncDark: boolean,
  dark: boolean,
): void {
  const kept = Array.from(el.classList).filter((c) => {
    if (SHELL_CLASSES.has(c)) return false
    if (syncDark && c === 'p-dark') return false
    return true
  })
  const next = [...kept, shell, ...(syncDark && dark ? (['p-dark'] as const) : [])]
  el.className = next.join(' ')
}

/**
 * Apply shell class + nucleify-ui palette/mode.
 * Call from Nuxt plugins, Next providers, Vite demos, etc.
 */
export function setupNui(opts: SetupNuiOptions): void {
  if (typeof document === 'undefined') return

  const mode = opts.mode ?? 'dark'
  const syncDark = opts.syncDarkClass !== false
  const shell = opts.palette === 'next' ? 'nuc-next' : 'nuc-nuxt'

  applyShellClasses(document.documentElement, shell, syncDark, mode === 'dark')
  applyShellClasses(document.body, shell, syncDark, mode === 'dark')

  applyTheme(opts.palette, mode)
}

export function resolveThemeMode(): ThemeMode {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('p-dark') ? 'dark' : 'light'
}
