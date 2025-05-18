export function localStorageSetItem(item: string, value: string): void {
  if (process.client) {
    localStorage.setItem(item, value)
  }
}
