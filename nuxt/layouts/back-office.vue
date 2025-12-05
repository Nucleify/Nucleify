<template>
  <div id="back-office">
    <slot />
    <dm-dock />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'back-office',
})
</script>

<style lang="scss">
@import '../../modules/dm_colors';
</style>
