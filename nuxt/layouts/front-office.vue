<template>
  <div id="front-office">
    <dm-screen-loader />
    <dm-section-navbar />
    <slot />
    <dm-section-footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'front-office',
})
</script>
