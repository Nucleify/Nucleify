import { colorKeys, colorTypes, getColorValue } from 'atomic'

export function applyColorsWithNewSuffix(): void {
  if (import.meta.client) {
    colorKeys.forEach((item: string): void =>
      colorTypes.forEach((state: string): void => {
        const key = `${item}-item-${state}-new`
        const value = getColorValue(key)

        document.documentElement.style.setProperty(`--${key}`, value)
      })
    )
  }
}
