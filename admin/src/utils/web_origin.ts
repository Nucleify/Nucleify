export function getWebOrigin(): string {
  const config = useRuntimeConfig()
  return (
    String((config.public as { webOrigin?: string }).webOrigin || '').replace(
      /\/$/,
      ''
    ) || 'http://localhost:3000'
  )
}

export function openExternalUrl(url: string): void {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

