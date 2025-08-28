import type { App } from 'vue'

import {
  DMGeneralMenuTree,
  DMMenuTree,
  DMSettingsCard,
  DMSettingsCardContent,
  DMSettingsPage,
  DMSkeletonSettingsCard,
  DMStaffMenuTree,
} from '.'

export function registerDMSettings(app: App<Element>): void {
  app
    .component('dm-settings-card', DMSettingsCard)
    .component('dm-settings-page', DMSettingsPage)
    .component('dm-skeleton-settings-card', DMSkeletonSettingsCard)
    .component('dm-menu-tree', DMMenuTree)
    .component('dm-general-menu-tree', DMGeneralMenuTree)
    .component('dm-staff-menu-tree', DMStaffMenuTree)
    .component('dm-settings-card-content', DMSettingsCardContent)
}
