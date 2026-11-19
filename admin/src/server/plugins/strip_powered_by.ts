import { removeResponseHeader } from 'h3'

/** Strip Nuxt fingerprint after the response headers are assembled. */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event) => {
    removeResponseHeader(event, 'x-powered-by')
  })
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response?.headers) return
    delete response.headers['x-powered-by']
    delete response.headers['X-Powered-By']
  })
})
