export function localStorageGetItem(item: string): string | undefined {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(item) || undefined
  } else {
    return undefined
  }
}
