import { colorKeys, colorShades } from 'nucleify'

export function buildServerColorVariables(cookies: string): string {
  const colorVariables: string[] = []

  colorKeys.forEach((item: string) => {
    colorShades.forEach((state: string) => {
      const baseKey = `${item}-${state}`
      const systemKey = `${baseKey}-s`
      const systemCookieMatch = cookies.match(
        new RegExp(`${systemKey}=([^;]+)`)
      )

      if (systemCookieMatch) {
        const value = decodeURIComponent(systemCookieMatch[1])
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
      const userCookieMatch = cookies.match(new RegExp(`${userKey}=([^;]+)`))
      const systemCookieMatch = cookies.match(
        new RegExp(`${systemKey}=([^;]+)`)
      )

      const userValue = userCookieMatch
        ? decodeURIComponent(userCookieMatch[1])
        : systemCookieMatch
          ? decodeURIComponent(systemCookieMatch[1])
          : null

      if (userValue) {
        colorVariables.push(`--${userKey}: ${userValue};`)
        colorVariables.push(`--${baseKey}: ${userValue};`)
      }
    })
  })

  return colorVariables.join(' ')
}

export function colorsServerPlugin(): void {
  return undefined
}
