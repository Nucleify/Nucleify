import { defineNuxtPlugin } from 'nuxt/app'
import type { App } from 'vue'

import { performanceClientPlugin } from './plugins'

export function registerNucPerformance(app: App<Element>): void {
  app.use(performanceClientPlugin as typeof defineNuxtPlugin)
}
