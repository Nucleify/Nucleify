export function localStorageSetItem(item: string, value: string): void {
  if (import.meta.client) {
    localStorage.setItem(item, value)
  }
}
