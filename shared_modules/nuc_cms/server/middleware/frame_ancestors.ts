import {
  defineEventHandler,
  getRequestURL,
  removeResponseHeader,
  setHeader,
} from 'h3'

/**
 * Allow the admin app to embed draft preview (and local marketing pages)
 * in an iframe. Clears legacy X-Frame-Options so CSP frame-ancestors wins.
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  const isPreview = /\/preview\//.test(path)
  const isLocal = process.env.APP_ENV === 'local'
  if (!isPreview && !isLocal) return

  const adminOrigin = (
    process.env.NUXT_PUBLIC_ADMIN_URL || 'https://admin.nucleify.io'
  ).replace(/\/$/, '')

  // Local ports drift when WEB_PORT/ADMIN_PORT are already taken (e.g. by the IDE).
  const ancestors = isLocal ? '*' : `'self' ${adminOrigin}`

  removeResponseHeader(event, 'x-frame-options')
  setHeader(event, 'content-security-policy', `frame-ancestors ${ancestors}`)
})
