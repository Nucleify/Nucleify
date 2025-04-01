import { colorKeys, colorTypes } from 'atomic'

export function setColorsVariables(): void {
  colorKeys.forEach((item: string): void => {
    colorTypes.forEach((state: string): void => {
      const key: string = `${item}-item-${state}`
      const value: string | null = localStorage.getItem(key)

      if (
        document.documentElement.style.getPropertyValue(`--${key}`) !== value
      ) {
        if (value) {
          document.documentElement.style.setProperty(`--${key}-new`, value)
        }
      }
    })
  })
}
