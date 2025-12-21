import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucFriendship(app: App<Element>): void {
  app
    .component(
      'nuc-friendship',
      defineAsyncComponent({
        loader: () => import('./index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-friends-list',
      defineAsyncComponent({
        loader: () => import('./components/friends-list.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-invite-form',
      defineAsyncComponent({
        loader: () => import('./components/invite-form.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
}
