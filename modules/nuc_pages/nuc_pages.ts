import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucPages(app: App<Element>): void {
  app
    // Wszystkie strony używają hydrateOnVisible - ładują się tylko gdy są widoczne
    .component(
      'nuc-about-page',
      defineAsyncComponent({
        loader: () => import('./pages/About/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }), // Ładuj 100px przed widocznością
      })
    )
    .component(
      'nuc-blog-page',
      defineAsyncComponent({
        loader: () => import('./pages/Blog/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-dashboard-page',
      defineAsyncComponent({
        loader: () => import('./pages/Dashboard/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-error-404-page',
      defineAsyncComponent({
        loader: () => import('./pages/Errors/404/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-home-page',
      defineAsyncComponent({
        loader: () => import('./pages/Home/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '200px' }), // Większy margin dla strony głównej
      })
    )
    .component(
      'nuc-license-page',
      defineAsyncComponent({
        loader: () => import('./pages/License/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-services-page',
      defineAsyncComponent({
        loader: () => import('./pages/Services/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
}
