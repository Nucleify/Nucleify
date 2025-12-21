import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucPages(app: App<Element>): void {
  app
    .component(
      'nuc-about-page',
      defineAsyncComponent(() => import('./pages/About/index.vue'))
    )
    .component(
      'nuc-blog-page',
      defineAsyncComponent(() => import('./pages/Blog/index.vue'))
    )
    .component(
      'nuc-dashboard-page',
      defineAsyncComponent(() => import('./pages/Dashboard/index.vue'))
    )
    .component(
      'nuc-error-404-page',
      defineAsyncComponent(() => import('./pages/Errors/404/index.vue'))
    )
    .component(
      'nuc-home-page',
      defineAsyncComponent(() => import('./pages/Home/index.vue'))
    )
    .component(
      'nuc-license-page',
      defineAsyncComponent(() => import('./pages/License/index.vue'))
    )
    .component(
      'nuc-services-page',
      defineAsyncComponent(() => import('./pages/Services/index.vue'))
    )
}
