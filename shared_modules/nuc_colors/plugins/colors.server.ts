import { defineNuxtPlugin, useHead, useRequestHeader } from 'nuxt/app'

import { buildServerColorVariables } from 'nucleify'

export default defineNuxtPlugin({
  name: 'nuc_colors_server',
  setup() {
    if (import.meta.server) {
      const cookies = useRequestHeader('cookie') || ''
      const colorVariables = buildServerColorVariables(cookies, 'nuxt')

      if (colorVariables) {
        useHead({
          style: [
            {
              innerHTML: `.nuc-nuxt, #back-office { ${colorVariables} }`,
            },
          ],
        })
      }
    }
  },
})
