import { colorKeys, colorShades, defaultColors } from 'nucleify'

import {
  colorStorageGet,
  getColorFramework,
  getColorScopeSelector,
} from './color_storage'

export function applyColorsWithSystemAndUser(): void {
  if (typeof document === 'undefined') return

  const scopeSelector = getColorScopeSelector()
  const cssVars: string[] = []

  colorKeys.forEach((item: string): void =>
    colorShades.forEach((state: string): void => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const userKey = `${baseKey}-u`
      const systemValue =
        colorStorageGet(systemKey) || defaultColors[baseKey] || ''

      if (systemValue) {
        cssVars.push(`--${systemKey}: ${systemValue}`)
        cssVars.push(`--${baseKey}: ${systemValue}`)
      }

      const userValue = colorStorageGet(userKey) || systemValue || ''

      if (userValue) {
        cssVars.push(`--${userKey}: ${userValue}`)
        cssVars.push(`--${baseKey}: ${userValue}`)
      }
    })
  )

  const style = document.createElement('style')
  const styleId = `nuc-color-vars-${getColorFramework()}`

  style.id = styleId
  style.textContent = `${scopeSelector} { ${cssVars.join('; ')} }`

  document
    .querySelectorAll('[id^="nuc-color-vars-"]')
    .forEach((node) => node.remove())

  document.head.appendChild(style)
}

if (typeof document !== 'undefined') {
  document.addEventListener('colorUpdated', applyColorsWithSystemAndUser)
}
