import type { App } from 'vue'

import { NucTimeCountdown } from './components'

export function registerNucTime(app: App<Element>): void {
  app.component('nuc-time-countdown', NucTimeCountdown)
}
