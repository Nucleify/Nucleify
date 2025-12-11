import type { App } from 'vue'

import { NucDocumentationDashboard, NucDocumentationPage } from './atomic'

export function registerNucDocumentation(app: App<Element>): void {
  app
    .component('nuc-documentation-page', NucDocumentationPage)
    .component('nuc-documentation-dashboard', NucDocumentationDashboard)
}
