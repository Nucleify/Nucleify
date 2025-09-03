import { defineNuxtPlugin } from 'nuxt/app'
import type { App } from 'vue'

import { performanceClientPlugin } from './plugins'

export function registerDMPerformance(app: App<Element>): void {
  app.use(performanceClientPlugin as typeof defineNuxtPlugin)
}
