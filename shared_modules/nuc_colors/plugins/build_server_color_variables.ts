import type { ColorFramework } from 'nucleify'
import {
  colorKeys,
  colorShades,
  getColorStorageCookiePatternForFramework,
  getDefaultColors,
} from 'nucleify'

export function buildServerColorVariables(
  cookies: string,
  framework: ColorFramework = 'nuxt'
): string {
  const defaultColors = getDefaultColors()
  const colorVariables: string[] = []

  const readCookie = (logicalKey: string): string | null => {
    const match = cookies.match(
      getColorStorageCookiePatternForFramework(logicalKey, framework)
    )
    if (match?.[1]) return decodeURIComponent(match[1])

    const legacyMatch = cookies.match(new RegExp(`${logicalKey}=([^;]+)`))
    if (!legacyMatch?.[1]) return null

    return decodeURIComponent(legacyMatch[1])
  }

  colorKeys.forEach((item: string) => {
    colorShades.forEach((state: string) => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const value = readCookie(systemKey) || defaultColors[baseKey] || ''

      if (value) {
        colorVariables.push(`--${systemKey}: ${value};`)
        colorVariables.push(`--${baseKey}: ${value};`)
      }
    })
  })

  colorKeys.forEach((item: string) => {
    colorShades.forEach((state: string) => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const userKey = `${baseKey}-u`

      const userValue =
        readCookie(userKey) ||
        readCookie(systemKey) ||
        defaultColors[baseKey] ||
        ''

      if (userValue) {
        colorVariables.push(`--${userKey}: ${userValue};`)
        colorVariables.push(`--${baseKey}: ${userValue};`)
      }
    })
  })

  return colorVariables.join(' ')
}
