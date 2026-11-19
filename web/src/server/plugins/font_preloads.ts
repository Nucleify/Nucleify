import { defineNitroPlugin } from 'nitropack/runtime'
import { injectFontPreloads, PRELOAD_TAGS } from '../utils/font_preloads'

export default defineNitroPlugin((nitroApp) => {
  if (import.meta.dev || PRELOAD_TAGS.length === 0) return

  nitroApp.hooks.hook('render:html' as never, injectFontPreloads as never)
})
