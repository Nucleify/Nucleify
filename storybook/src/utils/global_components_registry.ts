import { App } from 'vue'

import { GlobalComponentsRegistryInterface } from '@/types'

/**
 * Helper to register all Primevue components dynamically as: ...app.component('TabMenu', TabMenu);
 */
export const globalComponentsRegistry = (
  components: GlobalComponentsRegistryInterface,
  context: App
): void => {
  Object.entries(components).forEach(([keyName, definition]): void => {
    context.component(keyName, definition)
  })
}
