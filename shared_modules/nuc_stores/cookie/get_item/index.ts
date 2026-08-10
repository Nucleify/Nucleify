let cachedCookieString = ''
let cachedCookieMap: Map<string, string> | null = null

function parseCookies(): Map<string, string> {
  const current = document.cookie
  if (cachedCookieMap && cachedCookieString === current) {
    return cachedCookieMap
  }

  cachedCookieString = current
  cachedCookieMap = new Map()

  for (const pair of current.split('; ')) {
    const eqIdx = pair.indexOf('=')
    if (eqIdx > 0) {
      cachedCookieMap.set(pair.slice(0, eqIdx), pair.slice(eqIdx + 1))
    }
  }

  return cachedCookieMap
}

export function invalidateCookieCache(): void {
  cachedCookieMap = null
  cachedCookieString = ''
}

export function cookieGetItem(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined
  }

  return parseCookies().get(name)
}
