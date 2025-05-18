export function sessionStorageSetItem(item: string, value: string): void {
  if (process.client) {
    sessionStorage.setItem(item, value)
  }
}
