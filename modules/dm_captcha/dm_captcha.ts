import { App } from 'vue'

import { DmCaptcha, DmCaptchaDialog } from './components'

export function registerDMCaptcha(app: App) {
  app
    .component('DmCaptcha', DmCaptcha)
    .component('DmCaptchaDialog', DmCaptchaDialog)
}
