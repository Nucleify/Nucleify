import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucActivity(app: App<Element>): void {
  app
    .component(
      'nuc-activity-page',
      defineAsyncComponent(() => import('./atomic/pages/General/index.vue'))
    )
    .component(
      'nuc-activity-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/General.vue')
      )
    )
}
