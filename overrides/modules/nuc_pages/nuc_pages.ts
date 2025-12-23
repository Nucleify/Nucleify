import type { App } from 'vue'

import { NucHomePage } from './pages'

export function registerNucPages(app: App<Element>): void {
  app.component('nuc-home-page', NucHomePage)
}
