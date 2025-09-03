import type { App } from 'vue'

import {
  DmGeneralMenuTree,
  DmMenuTree,
  DmSettingsCard,
  DmSettingsCardContent,
  DmSettingsPage,
  DmSkeletonSettingsCard,
  DmStaffMenuTree,
} from '.'

export function registerDMSettings(app: App<Element>): void {
  app
    .component('dm-settings-card', DmSettingsCard)
    .component('dm-settings-page', DmSettingsPage)
    .component('dm-skeleton-settings-card', DmSkeletonSettingsCard)
    .component('dm-menu-tree', DmMenuTree)
    .component('dm-general-menu-tree', DmGeneralMenuTree)
    .component('dm-staff-menu-tree', DmStaffMenuTree)
    .component('dm-settings-card-content', DmSettingsCardContent)
}
