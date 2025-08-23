import type { App } from 'vue'

import { DMSettingsCard, DMSettingsPage, DMSkeletonSettingsCard } from '.'

export function registerDMSettings(app: App<Element>): void {
  app
    .component('dm-settings-card', DMSettingsCard)
    .component('dm-settings-page', DMSettingsPage)
    .component('dm-skeleton-settings-card', DMSkeletonSettingsCard)
}
