import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucDialog(app: App<Element>): void {
  app.component(
    'nuc-dialog',
    defineAsyncComponent(() => import('./index.vue'))
  )
}
