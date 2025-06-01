export function sessionStorageSetItem(item: string, value: string): void {
  if (import.meta.client) {
    sessionStorage.setItem(item, value)
  }
}
