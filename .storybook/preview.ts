/**
 *  Styles
 */
import '../atomic/bosons/styles/index.scss'

/**
 *  App mount
 */
import { createApp } from 'vue'
export const app = createApp({})

/**
 *  PrimeVue
 */
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import PrimeVue from 'primevue/config'

app.use(PrimeVue, {
  theme: {
    preset: DataManagerPreset,
    options: {
      darkModeSelector: true,
    },
  },
  ripple: true,
})

import { DataManagerPreset } from '../atomic/primevue_preset'
import type { Preview } from '@storybook/vue3'

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
