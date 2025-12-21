import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucFiles(app: App<Element>): void {
  app
    .component(
      'nuc-file-dashboard',
      defineAsyncComponent(() => import('./atomic/templates/Dashboard.vue'))
    )
    .component(
      'nuc-file-page',
      defineAsyncComponent(() => import('./atomic/pages/index.vue'))
    )
}
