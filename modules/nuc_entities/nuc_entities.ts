import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucEntities(app: App<Element>): void {
  app
    .component(
      'nuc-article-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Article/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-contact-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Contact/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-entities-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/General/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-money-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Money/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-article-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Article.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-contact-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Contact.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-money-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/Money.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-user-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/User.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
}
