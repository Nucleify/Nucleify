import {
  colorStorageGetInitializedKey,
  localStorageGetItem,
  localStorageSetItem,
  resetColorsToDefault,
} from 'nucleify'

export function resetColorsIfEmpty(): void {
  if (typeof window === 'undefined') return

  const initializedKey = colorStorageGetInitializedKey()
  const shouldReset =
    localStorageGetItem(initializedKey) === 'true' ? false : true

  if (!shouldReset) return

  localStorageSetItem(initializedKey, 'true')
  void resetColorsToDefault()
}
