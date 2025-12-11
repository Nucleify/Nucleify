import type { App } from 'vue'

import { NucScreenLoader } from '.'

export function registerNucScreenLoader(app: App<Element>): void {
  app.component('nuc-screen-loader', NucScreenLoader)
}
