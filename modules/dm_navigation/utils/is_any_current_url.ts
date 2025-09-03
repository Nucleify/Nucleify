import { useRoute } from 'nuxt/app'

export function isAnyCurrentUrl(urls: string[]): boolean {
  const route = useRoute()
  return urls.some((url) => route.path.includes(url))
}
