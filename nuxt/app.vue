<template>
  <div>
    <client-only>
      <dm-screen-lights :count="8" />
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
  title:
    'DataManager – Laravel/Nuxt ERP with Modular Design and Next-gen Architecture',
  meta: [
    { property: 'og:image', content: '/img/og-image.png' },
    { property: 'og:logo', content: '/img/logo.svg' },
    {
      name: 'description',
      content:
        'Streamline ERP and design management with a powerful data manager built using Laravel and Nuxt. Easily organize, manage, and access all your data types in one powerful, user-friendly platform - perfect for CRM, ERP and E-commerce solutions.',
    },
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
@import 'atomic/boson/styles';
</style>
