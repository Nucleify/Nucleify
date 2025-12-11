import type { App } from 'vue'

import { NucModulesInfo, NucModulesSettings } from '.'

export function registerNucModules(app: App<Element>): void {
  app
    .component('nuc-modules-info', NucModulesInfo)
    .component('nuc-modules-settings', NucModulesSettings)
}
