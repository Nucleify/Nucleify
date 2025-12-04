import type { App } from 'vue'

import { DmDialog } from '.'

export function registerDMDialog(app: App<Element>): void {
  app.component('dm-dialog', DmDialog)
}
