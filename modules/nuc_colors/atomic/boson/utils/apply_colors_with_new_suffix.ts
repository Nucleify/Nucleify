import { colorKeys, colorShades, getColorValue } from 'atomic'

export function applyColorsWithNewSuffix(): void {
  if (import.meta.client) {
    const cssVars: string[] = []

    colorKeys.forEach((item: string): void =>
      colorShades.forEach((state: string): void => {
        const key = `${item}-item-${state}-new`
        const value = getColorValue(key)

        cssVars.push(`--${key}: ${value}`)
      })
    )

    const style = document.createElement('style')

    style.id = 'nuc-color-vars'
    style.textContent = `:root { ${cssVars.join('; ')} }`

    const existingStyle = document.getElementById('nuc-color-vars')

    if (existingStyle) {
      existingStyle.remove()
    }
    document.head.appendChild(style)
  }
}
