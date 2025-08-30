import type { App } from 'vue'

import { DmNavigationBackButton } from './components'

export function registerDMNavigation(app: App<Element>): void {
  app.component('dm-navigation-back-button', DmNavigationBackButton)
}
