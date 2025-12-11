<template>
  <div>
    <client-only>
      <nuc-screen-lights :count="8" />
    </client-only>
    <ad-toast />
    <NuxtRouteAnnouncer />
    <NuxtLayout :name="officeType">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { resetColorsIfEmpty, useOfficeType } from 'atomic'

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

onMounted(() => {
  resetColorsIfEmpty()
})
</script>

<style lang="scss">
@import 'assets/styles';
</style>
