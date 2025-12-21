import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucTasks(app: App<Element>): void {
  app
    .component(
      'nuc-task-page',
      defineAsyncComponent(() => import('./atomic/pages/index.vue'))
    )
    .component(
      'nuc-task-dashboard',
      defineAsyncComponent(() => import('./atomic/templates/Dashboard.vue'))
    )
}
