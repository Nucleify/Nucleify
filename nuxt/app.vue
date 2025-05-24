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
defineOgImageComponent('NuxtSeo', {
  title: 'Data Manager by Atomic IT',
  description:
    'Manage various data types from a single place with this development template.',
  colorMode: 'dark',
})
</script>

<style lang="scss">
@import 'atomic/boson/styles';
</style>
