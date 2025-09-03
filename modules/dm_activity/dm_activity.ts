import type { App } from 'vue'

import { ActivityDashboard, ActivityPage } from './atomic'

export function registerDMActivity(app: App<Element>): void {
  app
    .component('dm-activity-page', ActivityPage)
    .component('dm-activity-dashboard', ActivityDashboard)
}
