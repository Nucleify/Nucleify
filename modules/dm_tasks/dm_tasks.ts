import type { App } from 'vue'

import { TaskPage, TaskDashboard } from './atomic'

export function registerDMtasks(app: App<Element>): void {
  app
    .component('dm-task-page', TaskPage)
    .component('dm-task-dashboard', TaskDashboard)
}
