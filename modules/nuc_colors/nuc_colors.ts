import { defineNuxtPlugin } from 'nuxt/app'
import type { App } from 'vue'

import { NucColorPicker, NucColorSettingsCard } from './atomic'
import { colorsClientPlugin, colorsServerPlugin } from './plugins'

export function registerNucColors(app: App<Element>): void {
  app
    /**
     *  Components
     */
    .component('nuc-color-picker', NucColorPicker)
    .component('nuc-color-settings-card', NucColorSettingsCard)

    /**
     *  Plugins
     */
    .use(colorsClientPlugin as typeof defineNuxtPlugin)
    .use(colorsServerPlugin as typeof defineNuxtPlugin)
}
