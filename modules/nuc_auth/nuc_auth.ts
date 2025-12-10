import type { App } from 'vue'

import { NucLoginPage, NucRegisterPage, NucTestLoginButtons } from '.'

export function registerNucAuth(app: App<Element>): void {
  app
    .component('nuc-login-page', NucLoginPage)
    .component('nuc-register-page', NucRegisterPage)
    .component('nuc-test-login-buttons', NucTestLoginButtons)
}
