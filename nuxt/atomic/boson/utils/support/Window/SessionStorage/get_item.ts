export function sessionStorageGetItem(item: string): string | undefined {
  if (process.client) {
    return sessionStorage.getItem(item) || undefined
  } else {
    return undefined
  }
}
