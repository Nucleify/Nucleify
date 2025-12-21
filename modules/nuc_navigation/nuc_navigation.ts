import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucNavigation(app: App<Element>): void {
  app.component(
    'nuc-navigation-back-button',
    defineAsyncComponent(() => import('./components/back-button.vue'))
  )
}
