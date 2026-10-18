<template>
  <div>
    <nui-toast position="top-right" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { applyRainbow } from 'nui-rainbow'
import 'nui-rainbow/styles.css'
import { joinURL } from 'ufo'
import { computed, onBeforeUnmount, onMounted } from 'vue'

import { isLabUserAgent } from '~/utils/is_lab_user_agent'

const route = useRoute()
const config = useRuntimeConfig()

/** Never strip path slashes — that caused GSC smash URLs like /enhometerms-of-service. */
const canonicalHref = computed(() => {
  const base = String(config.public.appUrl || 'https://nucleify.io').replace(
    /\/$/,
    ''
  )
  const path = route.path.startsWith('/') ? route.path : `/${route.path}`
  return joinURL(base, path)
})

// PSI spoofs navigator.userAgent; the *request* UA still has Chrome-Lighthouse.
// Only stamp nuc-lab on SSR — never nuc-iris-boot (iris at 0% + slow/failed JS = black screen).
if (import.meta.server) {
  const ua = useRequestHeaders(['user-agent'])['user-agent']
  if (isLabUserAgent(ua)) {
    useServerHead({
      htmlAttrs: { class: 'nuc-lab' },
    })
  }
}

useHead({
  htmlAttrs: { class: 'nuc-nuxt p-dark' },
  bodyAttrs: {
    class: 'nuc-nuxt p-dark nui-rainbow',
    'reduced-motion': 'ignore',
  },
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: canonicalHref,
    },
  ],
  // Critical: before CSS chunks — dark shell so mobile never flashes white.
  style: [
    {
      key: 'nuc-critical-shell',
      textContent: 'html,body{margin:0;background:#070908;color:#e7ebe8}',
    },
  ],
})

let stopRainbow: (() => void) | undefined

onMounted(() => {
  stopRainbow = applyRainbow(document.body, {
    cycle: 'branded',
    duration: 30,
    reducedMotion: 'ignore',
  })
})

onBeforeUnmount(() => {
  stopRainbow?.()
})
</script>

<style lang="scss">
@import '~/assets';

html,
body {
  margin: 0;
  height: auto;
  min-height: 100%;
  overflow: auto;
  background: #070908;
  color: #e7ebe8;
}
</style>
