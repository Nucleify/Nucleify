export function sessionStorageGetItem(item: string): string | undefined {
  if (import.meta.client) {
    return sessionStorage.getItem(item) || undefined
  } else {
    return undefined
  }
}
