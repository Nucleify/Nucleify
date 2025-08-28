import type { App } from 'vue'

import { DocumentationDashboard, DocumentationPage } from './atomic'

export function registerDMDocumentation(app: App<Element>): void {
  app
    .component('dm-documentation-page', DocumentationPage)
    .component('dm-documentation-dashboard', DocumentationDashboard)
}
