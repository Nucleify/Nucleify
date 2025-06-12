import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  function deferCSS() {
    const links = document.querySelectorAll('link[rel="stylesheet"]')

    links.forEach((link, index) => {
      if (index > 0) {
        link.setAttribute('media', 'print')
        link.setAttribute('onload', "this.media='all'")
      }
    })
  }

  function optimizeImages() {
    const images = document.querySelectorAll('img')

    images.forEach((img) => {
      if (!img.loading) img.loading = 'lazy'
      if (!img.decoding) img.decoding = 'async'
    })
  }

  function reduceLayoutThrashing() {
    let ticking = false

    function updateLayout() {
      ticking = false
    }

    function requestTick() {
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
