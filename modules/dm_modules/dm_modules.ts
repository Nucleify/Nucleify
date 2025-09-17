import type { App } from 'vue'

import { DmModulesInfo, DmModulesSettings } from '.'

export function registerDMModules(app: App<Element>): void {
  app
    .component('dm-modules-info', DmModulesInfo)
    .component('dm-modules-settings', DmModulesSettings)
}
