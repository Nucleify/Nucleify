import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucModules(app: App<Element>): void {
  app
    .component(
      'nuc-modules-info',
      defineAsyncComponent(() => import('./atomic/section/info/index.vue'))
    )
    .component(
      'nuc-modules-settings',
      defineAsyncComponent(() => import('./settings/index.vue'))
    )
}
