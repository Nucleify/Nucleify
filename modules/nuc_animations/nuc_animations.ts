import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucAnimations(app: App<Element>): void {
  app
    .component(
      'nuc-animation-bounce',
      defineAsyncComponent(() => import('./bounce/index.vue'))
    )
    .component(
      'nuc-animation-hexagons',
      defineAsyncComponent(() => import('./hexagons/index.vue'))
    )
}
