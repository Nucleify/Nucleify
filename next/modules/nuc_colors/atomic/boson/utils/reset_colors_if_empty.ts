import { resetColorsToDefault } from './reset_colors_to_default'

// TODO(nuc_stores): replace local storage helpers with atomic exports
// after nuc_stores is migrated to Next.
function localStorageGetItem(key: string): string {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(key) || ''
}

function localStorageSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, value)
}

export function resetColorsIfEmpty(): void {
  if (typeof window === 'undefined') return

  const shouldReset =
    localStorageGetItem('colors-initialized') === 'true' ? false : true

  if (!shouldReset) return

  localStorageSetItem('colors-initialized', 'true')
  resetColorsToDefault()
}
