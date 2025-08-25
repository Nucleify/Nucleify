import type { App } from 'vue'

import { DMSettingsCard, DMSettingsPage } from '.'

export function registerDMSettings(app: App<Element>): void {
  app
    .component('dm-settings-card', DMSettingsCard)
    .component('dm-settings-page', DMSettingsPage)
}
