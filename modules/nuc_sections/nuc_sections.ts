import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucSections(app: App<Element>): void {
  app
    .component(
      'nuc-section-category',
      defineAsyncComponent({
        loader: () => import('./components/category/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-section-contact',
      defineAsyncComponent({
        loader: () => import('./components/contact/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-section-faq',
      defineAsyncComponent({
        loader: () => import('./components/faq/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-section-footer',
      defineAsyncComponent({
        loader: () => import('./components/footer/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '50px' }), // Footer na dole, mniejszy margin
      })
    )
    .component(
      'nuc-section-navbar',
      defineAsyncComponent({
        loader: () => import('./components/navbar/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '200px' }), // Navbar na górze, większy margin
      })
    )
    .component(
      'nuc-section-stack',
      defineAsyncComponent({
        loader: () => import('./components/stack/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-section-start',
      defineAsyncComponent({
        loader: () => import('./components/start/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '200px' }), // Start section często na początku
      })
    )
    .component(
      'nuc-section-why-us',
      defineAsyncComponent({
        loader: () => import('./components/why-us/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
