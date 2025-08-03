import type { App } from 'vue'

import { FileDashboard, FilePage } from './atomic'

export function registerDMFiles(app: App<Element>): void {
  app
    .component('dm-file-dashboard', FileDashboard)
    .component('dm-file-page', FilePage)
}
