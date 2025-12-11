import {
  localStorageGetItem,
  localStorageSetItem,
  resetColorsToDefault,
} from 'atomic'

export function resetColorsIfEmpty() {
  if (import.meta.client) {
    const shouldReset =
      localStorageGetItem('colors-initialized') === 'true' ? false : true

    if (!shouldReset) return

    localStorageSetItem('colors-initialized', 'true')
    resetColorsToDefault()
  }
}
