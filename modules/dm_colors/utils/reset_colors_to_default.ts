import {
  defaultColors,
  colorKeys,
  colorTypes,
  cookieSetItem,
  localStorageSetItem,
} from 'atomic'

export function resetColorsToDefault(): void {
  if (import.meta.client) {
    console.log('🔄 Resetting all colors to default values...')
    colorKeys.forEach((item: string): void =>
      colorTypes.forEach((state: string): void => {
        const key = `${item}-item-${state}`
        const newKey = `${key}-new`
        const defaultValue = defaultColors[key]

        if (defaultValue) {
          cookieSetItem(newKey, defaultValue)
          localStorageSetItem(newKey, defaultValue)

          document.documentElement.style.setProperty(
            `--${newKey}`,
            defaultValue
          )

          console.log(`✅ Reset: ${newKey} = ${defaultValue}`)
        }
      })
    )
    console.log('🎉 All colors reset to default values!')
  }
}
