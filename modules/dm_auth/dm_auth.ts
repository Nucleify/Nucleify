import type { App } from 'vue'

import { LoginPage, RegisterPage, TestLoginButtons } from '.'

export function registerDMAuth(app: App<Element>): void {
  app
    .component('dm-login-page', LoginPage)
    .component('dm-register-page', RegisterPage)
    .component('dm-test-login-buttons', TestLoginButtons)
}
