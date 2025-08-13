import type { App } from 'vue'

import { DMScreenLoader } from '.'

export function registerDMScreenLoader(app: App<Element>): void {
  app.component('dm-screen-loader', DMScreenLoader)
}
