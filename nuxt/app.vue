<template>
  <div>
    <ad-logo-symbol style="display: none;" />
    <nuc-screen-lights :count="8" />
    <ad-toast />
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="officeType">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {
  AdLogoSymbol,
  resetColorsIfEmpty,
  syncColorsWithDatabase,
  useOfficeType,
} from 'atomic'

const route = useRoute()

const GTM_ID = 'GTM-WQH9K476'
const CLARITY_ID = 'vmewuw52gn'

useHead(() => ({
  htmlAttrs: {
    class: 'p-dark',
  },
  meta: [
    { property: 'og:image', content: '/img/og-image.png' },
    { property: 'og:logo', content: '/img/logo.svg' },
    {
      name: 'author',
      content: 'Szymon Radomski (SzymCode)',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: appUrl() + '/' + route.path.replace(/\//g, ''),
    },
  ],
  noscript: [
    {
      key: 'gtm-noscript',
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      body: true,
    },
  ],
}))

function loadGTM() {
  // biome-ignore lint/suspicious/noExplicitAny: window is not typed
  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.body.appendChild(s)
}

function loadClarity() {
  // biome-ignore lint/suspicious/noExplicitAny: window is not typed
  const w = window as any
  w.clarity =
    w.clarity ||
    function () {
      ;(w.clarity.q = w.clarity.q || []).push(arguments)
    }
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.body.appendChild(s)
}

function loadAnalytics() {
  loadGTM()
  loadClarity()
}

const { officeType, getOfficeType } = useOfficeType()

watchEffect(() => {
  officeType.value = getOfficeType()
})

if (import.meta.client) {
  resetColorsIfEmpty()
}

onMounted(() => {
  requestIdleCallback(() => {
    loadAnalytics()
  })
})

watch(
  () => route.path,
  async () => {
    await syncColorsWithDatabase()
  }
)
</script>

<style lang="scss">
@import 'assets/styles';
</style>
