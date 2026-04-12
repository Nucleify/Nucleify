<template>
  <div id="back-office">
    <main><slot /></main>
    <nuc-dock />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'back-office',
})

useHead({
  pageTransition: { name: 'page', mode: 'out-in' },
})
</script>

<style lang="scss">
@import '../../modules/back_office';
</style>
