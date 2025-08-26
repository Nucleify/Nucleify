import type { App } from 'vue'

import { DmModulesInfo } from './atomic'

export function registerDMModules(app: App<Element>): void {
  app.component('dm-modules-info', DmModulesInfo)
}
