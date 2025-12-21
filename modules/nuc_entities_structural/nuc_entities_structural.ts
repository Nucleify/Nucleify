import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucEntitiesStructural(app: App<Element>): void {
  app
    .component(
      'nuc-card-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Card.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-card-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Card/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-feature-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Feature.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-feature-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Feature/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-link-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Link.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-link-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Link/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-question-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Question.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-question-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Question/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-structural-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/General/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-technology-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Technology/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-technology-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Technology.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
