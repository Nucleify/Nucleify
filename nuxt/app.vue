<template>
  <div>
    <ad-toast />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

defineOgImageComponent('NuxtSeo', {
  title: 'DataManager – Next-gen ERP',
  description:
    'Manage various data types from a single place with this development template.',
  colorMode: 'dark',
})

useHead(() => ({
  title: 'DataManager – Laravel/Nuxt ERP with Modular Design and Next-gen Architecture',
  meta: [
    { name: 'description', content: 'Streamline ERP and design management with development template. Easily organize, manage, and access all your data types in one powerful, user-friendly platform.' }
  ],
  link: [
    {
      rel: 'canonical',
      href: appUrl() + route.path.replace(/\//g, '')
    },
  ],
}))
</script>

<style lang="scss">
@import 'atomic/boson/styles';
</style>
