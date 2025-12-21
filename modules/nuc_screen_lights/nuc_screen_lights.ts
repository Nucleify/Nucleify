import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucScreenLights(app: App<Element>): void {
  app.component(
    'nuc-screen-lights',
    defineAsyncComponent(() => import('./index.vue'))
  )
}
