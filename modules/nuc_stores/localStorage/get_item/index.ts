export function localStorageGetItem(item: string): string | undefined {
  if (import.meta.client) {
    return localStorage.getItem(item) || undefined
  } else {
    return undefined
  }
}
