import type { App } from 'vue'

import { DMColorPicker } from './atomic'

export function registerDMColors(app: App<Element>): void {
  app.component('dm-color-picker', DMColorPicker)
}
