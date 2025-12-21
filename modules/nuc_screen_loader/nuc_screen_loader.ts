import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucScreenLoader(app: App<Element>): void {
  app.component(
    'nuc-screen-loader',
    defineAsyncComponent(() => import('./index.vue'))
  )
}
