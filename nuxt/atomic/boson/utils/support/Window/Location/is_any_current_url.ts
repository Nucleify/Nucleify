import { useRoute } from '#imports'

export function isAnyCurrentUrl(urls: string[]): boolean {
  const route = useRoute()
  return urls.some((url) => route.path.includes(url))
}
