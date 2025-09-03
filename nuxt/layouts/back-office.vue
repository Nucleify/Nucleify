<template>
  <div id="back-office">
    <slot />
    <ad-dock />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'back-office',
})
</script>
