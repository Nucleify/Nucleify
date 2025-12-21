import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucEntitiesStructural(app: App<Element>): void {
  app
    .component(
      'nuc-card-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Card.vue')
      )
    )
    .component(
      'nuc-card-page',
      defineAsyncComponent(() => import('./atomic/pages/Card/index.vue'))
    )
    .component(
      'nuc-feature-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Feature.vue')
      )
    )
    .component(
      'nuc-feature-page',
      defineAsyncComponent(() => import('./atomic/pages/Feature/index.vue'))
    )
    .component(
      'nuc-link-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Link.vue')
      )
    )
    .component(
      'nuc-link-page',
      defineAsyncComponent(() => import('./atomic/pages/Link/index.vue'))
    )
    .component(
      'nuc-question-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Question.vue')
      )
    )
    .component(
      'nuc-question-page',
      defineAsyncComponent(() => import('./atomic/pages/Question/index.vue'))
    )
    .component(
      'nuc-structural-page',
      defineAsyncComponent(() => import('./atomic/pages/General/index.vue'))
    )
    .component(
      'nuc-technology-page',
      defineAsyncComponent(() => import('./atomic/pages/Technology/index.vue'))
    )
    .component(
      'nuc-technology-dashboard',
      defineAsyncComponent(
        () => import('./atomic/templates/Dashboard/Technology.vue')
      )
    )
}
