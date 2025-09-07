import type { App } from 'vue'

import { DmModulesCube, DmModulesInfo, DmModulesSettings } from '.'

export function registerDMModules(app: App<Element>): void {
  app
    .component('dm-modules-cube', DmModulesCube)
    .component('dm-modules-info', DmModulesInfo)
    .component('dm-modules-settings', DmModulesSettings)
}
