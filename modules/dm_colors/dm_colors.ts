import { defineNuxtPlugin } from 'nuxt/app'
import type { App } from 'vue'

import { DMColorPicker, DMColorSettingsCard } from './atomic'
import { colorsClientPlugin, colorsServerPlugin } from './plugins'

export function registerDMColors(app: App<Element>): void {
  app
    /**
     *  Components
     */
    .component('dm-color-picker', DMColorPicker)
    .component('dm-color-settings-card', DMColorSettingsCard)

    /**
     *  Plugins
     */
    .use(colorsClientPlugin as typeof defineNuxtPlugin)
    .use(colorsServerPlugin as typeof defineNuxtPlugin)
}
