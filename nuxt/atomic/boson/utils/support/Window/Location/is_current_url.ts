export function isCurrentUrl(url: string): boolean {
  return window.location.pathname.includes(url)
}
