export function sessionStorageGetItem(item: string): string | undefined {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(item) || undefined
  } else {
    return undefined
  }
}
