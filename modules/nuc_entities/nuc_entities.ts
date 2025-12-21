import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucEntities(app: App<Element>): void {
  app
    .component(
      'nuc-article-page',
      defineAsyncComponent(() => import('./atomic/pages/Article/index.vue'))
    )
    .component(
      'nuc-contact-page',
      defineAsyncComponent(() => import('./atomic/pages/Contact/index.vue'))
    )
    .component(
      'nuc-entities-page',
      defineAsyncComponent(() => import('./atomic/pages/General/index.vue'))
    )
    .component(
      'nuc-money-page',
      defineAsyncComponent(() => import('./atomic/pages/Money/index.vue'))
    )
    .component(
      'nuc-article-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Article.vue')
      )
    )
    .component(
      'nuc-contact-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Contact.vue')
      )
    )
    .component(
      'nuc-money-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Money.vue')
      )
    )
    .component(
      'nuc-user-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/User.vue')
      )
    )
}
