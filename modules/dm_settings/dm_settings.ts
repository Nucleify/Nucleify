import type { App } from 'vue'

import { DMSettingsPage } from '.'

export function registerDMSettings(app: App<Element>): void {
  app.component('dm-settings-page', DMSettingsPage)
}
