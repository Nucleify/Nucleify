import type { App } from 'vue'

import { NucFileDashboard, NucFilePage } from './atomic'

export function registerNucFiles(app: App<Element>): void {
  app
    .component('nuc-file-dashboard', NucFileDashboard)
    .component('nuc-file-page', NucFilePage)
}
