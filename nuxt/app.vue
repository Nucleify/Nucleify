<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
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
@use 'styles';
</style>
