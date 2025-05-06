<template>
  <div>
    <organism-toast />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
defineOgImageComponent('NuxtSeo', {
  title: 'NuxtStarter by Atomic IT',
  description:
    'This template offers a fully integrated development workflow, designed to streamline your project setup and enhance code quality.',
  colorMode: 'dark',
})
</script>

<style lang="scss">
@import 'atomic/boson/styles';
</style>
