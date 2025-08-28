import type { App } from 'vue'

import { DMAdminPage } from './atomic'

export function registerDMAdmin(app: App<Element>): void {
  app.component('dm-admin-page', DMAdminPage)
}
