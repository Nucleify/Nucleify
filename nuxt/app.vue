<template>
  <div>
    <nui-toast position="top-right" />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: 'nuc-nuxt' },
  bodyAttrs: { class: 'nuc-nuxt' },
})
</script>

<style lang="scss">
@import '../modules/index';

html,
body {
  height: auto;
  min-height: 100%;
  overflow: auto;
}
</style>
