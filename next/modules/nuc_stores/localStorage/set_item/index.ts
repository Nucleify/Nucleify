export function localStorageSetItem(item: string, value: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(item, value)
  }
}
