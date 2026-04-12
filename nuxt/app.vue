<template>
  <div>
    <ad-logo-symbol style="display: none;" />
    <ad-toast />
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="officeType"> <NuxtPage /> </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {
  AdLogoSymbol,
  resetColorsIfEmpty,
  syncColorsWithDatabase,
  useDarkMode,
  useOfficeType,
} from 'nucleify'

const route = useRoute()
const { isDark } = useDarkMode()

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
}))

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

const { officeType, getOfficeType } = useOfficeType()

watchEffect(() => {
  officeType.value = getOfficeType()
})

onMounted(() => {
  requestIdleCallback(() => {
    resetColorsIfEmpty()
  })

  let clarityLoaded = false
  const loadClarityOnce = (): void => {
    if (clarityLoaded) return
    clarityLoaded = true
    loadClarity()
  }
  const onFirstInteraction = (): void => {
    window.removeEventListener('scroll', onFirstInteraction)
    window.removeEventListener('pointerdown', onFirstInteraction)
    requestIdleCallback(() => loadClarityOnce())
  }
  window.addEventListener('scroll', onFirstInteraction, { passive: true })
  window.addEventListener('pointerdown', onFirstInteraction)
  setTimeout(loadClarityOnce, 12000)
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
@import '../modules/app';
</style>
