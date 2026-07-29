import { defineNuxtPlugin, useHead } from 'nuxt/app'

const DARK_MODE_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)nuc-dark-mode=([^;]*)/);if(m&&m[1]==='false'){document.documentElement.classList.remove('p-dark')}else{document.documentElement.classList.add('p-dark')}}catch(e){}})()`

export default defineNuxtPlugin(() => {
  if (import.meta.server) {
    useHead({
      script: [{ innerHTML: DARK_MODE_SCRIPT }],
    })
  }
})
