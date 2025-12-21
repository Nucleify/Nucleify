import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucTasks(app: App<Element>): void {
  app
    .component(
      'nuc-task-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-task-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
