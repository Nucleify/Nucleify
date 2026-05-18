export function getCurrentLang(defaultLang = 'en'): string {
  if (typeof window === 'undefined') return defaultLang

  const [firstSegment] = window.location.pathname
    .split('/')
    .filter((segment) => segment.length > 0)

  return firstSegment || defaultLang
}
