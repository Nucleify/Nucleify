import { isCurrentUrl } from './is_current_url'

export function isAnyCurrentUrl(urls: string[], pathname?: string): boolean {
  return urls.some((url) => isCurrentUrl(url, pathname))
}
