import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucTime(app: App<Element>): void {
  app.component(
    'nuc-time-countdown',
    defineAsyncComponent(() => import('./components/countdown.vue'))
  )
}
