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
  htmlAttrs: { class: 'nuc-nuxt p-dark' },
  bodyAttrs: { class: 'nuc-nuxt p-dark' },
  // Critical: before CSS chunks — dark shell so mobile never flashes white.
  style: [
    {
      key: 'nuc-critical-shell',
      textContent: 'html,body{margin:0;background:#070908;color:#e7ebe8}',
    },
  ],
})
</script>

<style lang="scss">
@import '~/assets';

html,
body {
  margin: 0;
  height: auto;
  min-height: 100%;
  overflow: auto;
  background: #070908;
  color: #e7ebe8;
}
</style>
