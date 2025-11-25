import type { App } from 'vue'

import { DmDock } from '.'

export function registerDMDock(app: App<Element>): void {
  app.component('dm-dock', DmDock)
}
