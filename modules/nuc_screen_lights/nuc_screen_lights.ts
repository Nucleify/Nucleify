import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucScreenLights(app: App<Element>): void {
  // nuc-screen-lights ładuje się tylko gdy jest widoczny (hydrateOnVisible)
  app.component(
    'nuc-screen-lights',
    defineAsyncComponent({
      loader: () => import('./index.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '50px' }), // Ładuj gdy widoczny (50px przed)
    })
  )
}
