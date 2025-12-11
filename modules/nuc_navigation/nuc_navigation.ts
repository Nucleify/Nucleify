import type { App } from 'vue'

import { NucNavigationBackButton } from './components'

export function registerNucNavigation(app: App<Element>): void {
  app.component('nuc-navigation-back-button', NucNavigationBackButton)
}
