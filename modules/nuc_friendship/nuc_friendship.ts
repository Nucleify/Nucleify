import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucFriendship(app: App<Element>): void {
  app
    .component(
      'nuc-friendship',
      defineAsyncComponent(() => import('./index.vue'))
    )
    .component(
      'nuc-friends-list',
      defineAsyncComponent(() => import('./components/friends-list.vue'))
    )
    .component(
      'nuc-invite-form',
      defineAsyncComponent(() => import('./components/invite-form.vue'))
    )
}
