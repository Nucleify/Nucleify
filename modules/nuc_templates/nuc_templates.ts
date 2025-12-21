import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucTemplates(app: App<Element>): void {
  app
    .component(
      'nuc-authors',
      defineAsyncComponent(() => import('./components/authors/index.vue'))
    )
    .component(
      'nuc-card-box',
      defineAsyncComponent(
        () => import('./components/card/boxes/components/Box.vue')
      )
    )
    .component(
      'nuc-card-boxes',
      defineAsyncComponent(() => import('./components/card/boxes/index.vue'))
    )
    .component(
      'nuc-card-category',
      defineAsyncComponent(() => import('./components/card/category/index.vue'))
    )
    .component(
      'nuc-cube',
      defineAsyncComponent(() => import('./components/cube/index.vue'))
    )
    .component(
      'nuc-flip-card',
      defineAsyncComponent(() => import('./components/card/flip/index.vue'))
    )
    .component(
      'nuc-home-link',
      defineAsyncComponent(() => import('./components/home-link/index.vue'))
    )
    .component(
      'nuc-tiles',
      defineAsyncComponent(() => import('./components/tiles/index.vue'))
    )
}
