export function navigateToUrl(url: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = url
  }
}
