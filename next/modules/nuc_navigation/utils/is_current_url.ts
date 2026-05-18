function getPathname(pathname?: string): string {
  if (typeof pathname === 'string') {
    return pathname
  }

  if (typeof window !== 'undefined') {
    return window.location.pathname
  }

  return ''
}

export function isCurrentUrl(url: string, pathname?: string): boolean {
  return getPathname(pathname).includes(url)
}
