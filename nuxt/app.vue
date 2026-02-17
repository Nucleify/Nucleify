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
}))

const { officeType, getOfficeType } = useOfficeType()

watchEffect(() => {
  officeType.value = getOfficeType()
})

if (import.meta.client) {
  resetColorsIfEmpty()

  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        syncColorsWithDatabase().catch((error) => {
          console.error('Failed to sync colors:', error)
        })
      },
      { timeout: 2000 }
    )
  } else {
    setTimeout(() => {
      syncColorsWithDatabase().catch((error) => {
        console.error('Failed to sync colors:', error)
      })
    }, 100)
  }
}

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
