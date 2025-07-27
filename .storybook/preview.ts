/**
 *  Styles
 */
import '../nuxt/atomic/boson/styles/index.scss'

/**
 *  App mount
 */
import { createApp } from 'vue'

/**
 *  PrimeVue
 */
import type { Preview } from '@storybook/vue3'
import PrimeVue from 'primevue/config'
import { DataManagerPreset } from '../nuxt/atomic/primevue_preset'

export const app = createApp({})

app.use(PrimeVue, {
  theme: {
    preset: DataManagerPreset,
    options: {
      darkModeSelector: true,
    },
  },
  ripple: true,
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
