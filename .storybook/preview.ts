import { createApp } from 'vue'

import Lara from '@primeuix/themes/lara'
import type { Preview } from '@storybook/vue3'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import { defaultColors } from '../modules/dm_colors/atomic/boson/constants/default'
import '../nuxt/styles/index.scss'

Object.entries(defaultColors).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--${key}-new`, value)
})

export const app = createApp({})

app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: true,
      cssLayer: {
        name: 'primevue',
        order: 'app-styles, primevue',
      },
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
