import type { App } from 'vue'

import { TaskDashboard, TaskPage } from './atomic'

export function registerDMTasks(app: App<Element>): void {
  app
    .component('dm-task-page', TaskPage)
    .component('dm-task-dashboard', TaskDashboard)
}
