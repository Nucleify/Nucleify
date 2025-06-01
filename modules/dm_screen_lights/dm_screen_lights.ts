import type { App } from 'vue'

import { DMScreenLights } from '.'

export function registerDMScreenLights(app: App<Element>): void {
  app.component('dm-screen-lights', DMScreenLights)
}
