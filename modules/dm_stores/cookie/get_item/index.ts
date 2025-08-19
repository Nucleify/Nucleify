export function cookieGetItem(name: string): string | undefined {
  if (import.meta.client) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || undefined
    }
  }
  return undefined
}
