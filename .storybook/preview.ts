import '../nuxt/styles/index.scss'

import { createApp } from 'vue'

import Lara from '@primeuix/themes/lara'
import type { Preview } from '@storybook/vue3'
import PrimeVue from 'primevue/config'

export const app = createApp({})

app.use(PrimeVue, {
  theme: {
    preset: Lara,
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
