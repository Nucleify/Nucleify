export function sessionStorageSetItem(item: string, value: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(item, value)
  }
}
