<template>
  <div id="back-office">
    <slot />
    <nuc-dock />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'back-office',
})
</script>

<style lang="scss">
@import '../../modules/nuc_colors';
</style>
