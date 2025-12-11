import type { App } from 'vue'

import { NucDock } from '.'

export function registerNucDock(app: App<Element>): void {
  app.component('nuc-dock', NucDock)
}
