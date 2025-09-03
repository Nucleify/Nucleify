import { useRoute } from 'nuxt/app'

export function isCurrentUrl(url: string): boolean {
  const route = useRoute()
  return route.path.includes(url)
}
