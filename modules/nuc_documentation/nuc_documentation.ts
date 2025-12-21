import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucDocumentation(app: App<Element>): void {
  app
    .component(
      'nuc-documentation-page',
      defineAsyncComponent(() => import('./atomic/pages/index.vue'))
    )
    .component(
      'nuc-documentation-dashboard',
      defineAsyncComponent(() => import('./atomic/templates/Dashboard.vue'))
    )
}
