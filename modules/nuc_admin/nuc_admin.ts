import type { App } from 'vue'

import { NucAdminPage } from './atomic'

export function registerNucAdmin(app: App<Element>): void {
  app.component('nuc-admin-page', NucAdminPage)
}
