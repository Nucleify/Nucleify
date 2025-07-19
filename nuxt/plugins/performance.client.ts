import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((): void => {
  function deferCSS(): void {
    const links = document.querySelectorAll('link[rel="stylesheet"]')

    links.forEach((link, index): void => {
      if (index > 0) {
        link.setAttribute('media', 'print')
        link.setAttribute('onload', "this.media='all'")
      }
    })
  }

  function optimizeImages(): void {
    const images = document.querySelectorAll('img')

    images.forEach((img): void => {
      if (!img.loading) img.loading = 'lazy'
      if (!img.decoding) img.decoding = 'async'
    })
  }

  function reduceLayoutThrashing(): void {
    let ticking = false

    function updateLayout(): void {
      ticking = false
    }

    function requestTick(): void {
      if (!ticking) {
        requestAnimationFrame(updateLayout)
        ticking = true
      }
    }

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(requestTick)

      resizeObserver.observe(document.body)
    }
  }

  if (import.meta.client) {
    deferCSS()
    optimizeImages()
    reduceLayoutThrashing()
  }
})
