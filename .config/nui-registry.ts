/**
 * Nucleify UI web components registry.
 * Loads components only in the browser (SSR-safe).
 * @see https://www.npmjs.com/package/nucleify-ui
 */

import type { Palette, ThemeMode } from 'nucleify-ui/theme'

let initialized = false

async function loadNuiComponents(): Promise<void> {
  await Promise.all([
    import('nucleify-ui/components/nui-accordion'),
    import('nucleify-ui/components/nui-anchor'),
    import('nucleify-ui/components/nui-auto-complete'),
    import('nucleify-ui/components/nui-avatar'),
    import('nucleify-ui/components/nui-badge'),
    import('nucleify-ui/components/nui-button'),
    import('nucleify-ui/components/nui-card'),
    import('nucleify-ui/components/nui-chart'),
    import('nucleify-ui/components/nui-checkbox'),
    import('nucleify-ui/components/nui-color-picker'),
    import('nucleify-ui/components/nui-data-table'),
    import('nucleify-ui/components/nui-date-picker'),
    import('nucleify-ui/components/nui-deferred-content'),
    import('nucleify-ui/components/nui-dialog'),
    import('nucleify-ui/components/nui-divider'),
    import('nucleify-ui/components/nui-dock'),
    import('nucleify-ui/components/nui-file-upload'),
    import('nucleify-ui/components/nui-float-label'),
    import('nucleify-ui/components/nui-heading'),
    import('nucleify-ui/components/nui-icon'),
    import('nucleify-ui/components/nui-image'),
    import('nucleify-ui/components/nui-input-mask'),
    import('nucleify-ui/components/nui-input-number'),
    import('nucleify-ui/components/nui-input-otp'),
    import('nucleify-ui/components/nui-input-text'),
    import('nucleify-ui/components/nui-knob'),
    import('nucleify-ui/components/nui-label'),
    import('nucleify-ui/components/nui-listbox'),
    import('nucleify-ui/components/nui-logo'),
    import('nucleify-ui/components/nui-menu'),
    import('nucleify-ui/components/nui-meter-group'),
    import('nucleify-ui/components/nui-paragraph'),
    import('nucleify-ui/components/nui-password'),
    import('nucleify-ui/components/nui-popover'),
    import('nucleify-ui/components/nui-progress-bar'),
    import('nucleify-ui/components/nui-progress-spinner'),
    import('nucleify-ui/components/nui-radio-button'),
    import('nucleify-ui/components/nui-rating'),
    import('nucleify-ui/components/nui-scroll-panel'),
    import('nucleify-ui/components/nui-scroll-top'),
    import('nucleify-ui/components/nui-select'),
    import('nucleify-ui/components/nui-select-button'),
    import('nucleify-ui/components/nui-skeleton'),
    import('nucleify-ui/components/nui-slider'),
    import('nucleify-ui/components/nui-speed-dial'),
    import('nucleify-ui/components/nui-swiper'),
    import('nucleify-ui/components/nui-tabs'),
    import('nucleify-ui/components/nui-tag'),
    import('nucleify-ui/components/nui-terminal'),
    import('nucleify-ui/components/nui-textarea'),
    import('nucleify-ui/components/nui-tile'),
    import('nucleify-ui/components/nui-toast'),
    import('nucleify-ui/components/nui-tooltip'),
    import('nucleify-ui/components/nui-tree'),
  ])
}

export function resolveNuiThemeMode(): ThemeMode {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('p-dark')
    ? 'dark'
    : 'light'
}

export async function initNuiRegistry(
  palette: Palette = 'nuxt',
  mode?: ThemeMode
): Promise<void> {
  if (initialized || typeof window === 'undefined') return

  await loadNuiComponents()

  const { applyTheme } = await import('nucleify-ui/theme')
  applyTheme(palette, mode ?? resolveNuiThemeMode())
  initialized = true
}
