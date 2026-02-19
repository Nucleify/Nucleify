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
  script: [
    {
      hid: 'gtm',
      children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
      type: 'text/javascript',
    },
  ],
  noscript: [
    {
      hid: 'gtm-noscript',
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      body: true,
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
