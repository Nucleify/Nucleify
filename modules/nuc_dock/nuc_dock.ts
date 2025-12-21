import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucDock(app: App<Element>): void {
  app.component(
    'nuc-dock',
    defineAsyncComponent(() => import('./index.vue'))
  )
}
