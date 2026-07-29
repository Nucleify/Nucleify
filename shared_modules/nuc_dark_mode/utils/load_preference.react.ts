export const STORAGE_KEY = 'nuc-dark-mode'

export function loadPreference(): boolean {
  if (typeof window === 'undefined') return true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) return stored === 'true'

  return true
}
