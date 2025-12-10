import type { App } from 'vue'

import { NucDialog } from '.'

export function registerNucDialog(app: App<Element>): void {
  app.component('nuc-dialog', NucDialog)
}
