import { colorKeys, colorTypes, localStorageGetItem } from 'atomic'

export function setColorsVariables(): void {
  colorKeys.forEach((item: string): void =>
    colorTypes.forEach((state: string): void => {
      const key = `${item}-item-${state}`
      const value = localStorageGetItem(key)

      if (
        document.documentElement.style.getPropertyValue(`--${key}`) !== value
      ) {
        if (value) {
          document.documentElement.style.setProperty(`--${key}-new`, value)
        }
      }
    })
  )
}
