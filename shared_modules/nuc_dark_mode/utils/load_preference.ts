export const STORAGE_KEY = 'nuc-dark-mode'

export function loadPreference(): boolean {
  if (import.meta.server) return true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'true'

  return true
}
