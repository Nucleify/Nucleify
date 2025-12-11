import type { App } from 'vue'

import { NucActivityDashboard, NucActivityPage } from './atomic'

export function registerNucActivity(app: App<Element>): void {
  app
    .component('nuc-activity-page', NucActivityPage)
    .component('nuc-activity-dashboard', NucActivityDashboard)
}
