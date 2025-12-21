import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucAuth(app: App<Element>): void {
  app
    .component(
      'nuc-login-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Login/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '200px' }), // Strony logowania często na początku
      })
    )
    .component(
      'nuc-register-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/Register/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '200px' }),
      })
    )
    .component(
      'nuc-test-login-buttons',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/TestLoginButtons/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
