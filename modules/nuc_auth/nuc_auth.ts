import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucAuth(app: App<Element>): void {
  app
    .component(
      'nuc-login-page',
      defineAsyncComponent(() => import('./atomic/pages/Login/index.vue'))
    )
    .component(
      'nuc-register-page',
      defineAsyncComponent(() => import('./atomic/pages/Register/index.vue'))
    )
    .component(
      'nuc-test-login-buttons',
      defineAsyncComponent(
        () => import('./atomic/templates/TestLoginButtons/index.vue')
      )
    )
}
