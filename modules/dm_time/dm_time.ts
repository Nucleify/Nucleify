import type { App } from 'vue'

import { DmTimeCountdown } from './components'

export function registerDMTime(app: App<Element>): void {
  app.component('dm-time-countdown', DmTimeCountdown)
}
