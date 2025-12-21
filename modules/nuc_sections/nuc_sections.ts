import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucSections(app: App<Element>): void {
  app
    .component(
      'nuc-section-category',
      defineAsyncComponent(() => import('./components/category/index.vue'))
    )
    .component(
      'nuc-section-contact',
      defineAsyncComponent(() => import('./components/contact/index.vue'))
    )
    .component(
      'nuc-section-faq',
      defineAsyncComponent(() => import('./components/faq/index.vue'))
    )
    .component(
      'nuc-section-footer',
      defineAsyncComponent(() => import('./components/footer/index.vue'))
    )
    .component(
      'nuc-section-navbar',
      defineAsyncComponent(() => import('./components/navbar/index.vue'))
    )
    .component(
      'nuc-section-stack',
      defineAsyncComponent(() => import('./components/stack/index.vue'))
    )
    .component(
      'nuc-section-start',
      defineAsyncComponent(() => import('./components/start/index.vue'))
    )
    .component(
      'nuc-section-why-us',
      defineAsyncComponent(() => import('./components/why-us/index.vue'))
    )
}
