import { useRoute } from 'vue-router'

export function isCurrentUrl(url: string): boolean {
  const route = useRoute()
  return route.path.includes(url)
}
