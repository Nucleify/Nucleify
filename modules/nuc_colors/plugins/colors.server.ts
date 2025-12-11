import { defineNuxtPlugin, useHead, useRequestEvent } from 'nuxt/app'

import { colorKeys, colorShades } from 'atomic'

export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    const event = useRequestEvent()
    if (event) {
      const cookies = event.node.req.headers.cookie || ''

      const colorVariables: string[] = []

      colorKeys.forEach((item: string) => {
        colorShades.forEach((state: string) => {
          const key = `${item}-item-${state}`
          const newKey = `${key}-new`

          const newCookieMatch = cookies.match(new RegExp(`${newKey}=([^;]+)`))
          if (newCookieMatch) {
            const value = decodeURIComponent(newCookieMatch[1])
            colorVariables.push(`--${newKey}: ${value};`)
          } else {
            const cookieMatch = cookies.match(new RegExp(`${key}=([^;]+)`))
            if (cookieMatch) {
              const value = decodeURIComponent(cookieMatch[1])
              colorVariables.push(`--${key}: ${value};`)
            }
          }
        })
      })

      if (colorVariables.length > 0) {
        useHead({
          style: [
            {
              innerHTML: `:root { ${colorVariables.join(' ')} }`,
            },
          ],
        })
      }
    }
  }
})
