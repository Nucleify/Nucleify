import type { App } from 'vue'

import { NucTaskDashboard, NucTaskPage } from './atomic'

export function registerNucTasks(app: App<Element>): void {
  app
    .component('nuc-task-page', NucTaskPage)
    .component('nuc-task-dashboard', NucTaskDashboard)
}
