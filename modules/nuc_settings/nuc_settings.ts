import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucSettings(app: App<Element>): void {
  app
    .component(
      'nuc-settings-card',
      defineAsyncComponent(() => import('./components/card/index.vue'))
    )
    .component(
      'nuc-settings-page',
      defineAsyncComponent(() => import('./index.vue'))
    )
    .component(
      'nuc-skeleton-settings-card',
      defineAsyncComponent(() => import('./components/card/skeleton.vue'))
    )
    .component(
      'nuc-menu-tree',
      defineAsyncComponent(() => import('./components/menu-tree/index.vue'))
    )
    .component(
      'nuc-general-menu-tree',
      defineAsyncComponent(
        () => import('./components/menu-tree/general/index.vue')
      )
    )
    .component(
      'nuc-staff-menu-tree',
      defineAsyncComponent(
        () => import('./components/menu-tree/staff/index.vue')
      )
    )
    .component(
      'nuc-settings-card-content',
      defineAsyncComponent(() => import('./components/content/index.vue'))
    )
}
