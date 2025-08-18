import type { App } from 'vue'

import { DMColorPicker, DMColorSettingsCard } from './atomic'

export function registerDMColors(app: App<Element>): void {
  app
    .component('dm-color-picker', DMColorPicker)
    .component('dm-color-settings-card', DMColorSettingsCard)
}
