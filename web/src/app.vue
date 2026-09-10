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
import { joinURL } from 'ufo'
import { computed } from 'vue'

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

useHead({
  htmlAttrs: { class: 'nuc-nuxt p-dark' },
  bodyAttrs: { class: 'nuc-nuxt p-dark' },
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
