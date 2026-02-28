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
  useDarkMode,
  useOfficeType,
} from 'atomic'

const route = useRoute()
const { isDark } = useDarkMode()

const GTM_ID = 'GTM-WQH9K476'
const GADS_ID = 'AW-17959551210'
const CLARITY_ID = 'vmewuw52gn'

useHead(() => ({
  htmlAttrs: {
    class: isDark.value ? 'p-dark' : '',
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

function loadGoogleAds() {
  // biome-ignore lint/suspicious/noExplicitAny: window is not typed
  const w = window as any
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`
  document.body.appendChild(s)

  w.dataLayer = w.dataLayer || []
  w.gtag =
    w.gtag ||
    function () {
      w.dataLayer.push(arguments)
    }
  w.gtag('js', new Date())
  w.gtag('config', GADS_ID)
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
  loadGoogleAds()
  loadClarity()
}

const { officeType, getOfficeType } = useOfficeType()

watchEffect(() => {
  officeType.value = getOfficeType()
})

onMounted(() => {
  requestIdleCallback(() => {
    resetColorsIfEmpty()
  })

  setTimeout(() => {
    loadAnalytics()
  }, 3500)
})

let syncTimeout: ReturnType<typeof setTimeout> | null = null

watch(
  () => route.path,
  () => {
    if (syncTimeout) clearTimeout(syncTimeout)
    syncTimeout = setTimeout(() => {
      requestIdleCallback(() => {
        syncColorsWithDatabase()
      })
    }, 300)
  }
)
</script>

<style lang="scss">
@import 'assets/styles';
</style>
