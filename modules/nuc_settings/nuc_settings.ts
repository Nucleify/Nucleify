import type { App } from 'vue'

import {
  NucGeneralMenuTree,
  NucMenuTree,
  NucSettingsCard,
  NucSettingsCardContent,
  NucSettingsPage,
  NucSkeletonSettingsCard,
  NucStaffMenuTree,
} from '.'

export function registerNucSettings(app: App<Element>): void {
  app
    .component('nuc-settings-card', NucSettingsCard)
    .component('nuc-settings-page', NucSettingsPage)
    .component('nuc-skeleton-settings-card', NucSkeletonSettingsCard)
    .component('nuc-menu-tree', NucMenuTree)
    .component('nuc-general-menu-tree', NucGeneralMenuTree)
    .component('nuc-staff-menu-tree', NucStaffMenuTree)
    .component('nuc-settings-card-content', NucSettingsCardContent)
}
