import { defineNuxtPlugin } from 'nuxt/app'

import { initNuiRegistry } from '../../.config/nui-registry'

export default defineNuxtPlugin({
  name: 'nui-registry',
  enforce: 'pre',
  async setup() {
    await initNuiRegistry('nuxt')
  },
})
