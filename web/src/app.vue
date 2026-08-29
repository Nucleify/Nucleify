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
  // Critical: before CSS chunks — kills default body margin FOUC (white frame).
  style: [
    {
      key: 'nuc-critical-shell',
      children: 'html,body{margin:0;}',
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
