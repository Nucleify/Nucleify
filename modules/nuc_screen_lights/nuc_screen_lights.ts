import type { App } from 'vue'

import { NucScreenLights } from '.'

export function registerNucScreenLights(app: App<Element>): void {
  app.component('nuc-screen-lights', NucScreenLights)
}
