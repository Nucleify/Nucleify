import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucAdmin(app: App<Element>): void {
  app.component(
    'nuc-admin-page',
    defineAsyncComponent(() => import('./atomic/pages/index.vue'))
  )
}
