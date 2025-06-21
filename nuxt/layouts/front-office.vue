<template>
  <div id="front-office">
    <dm-screen-loader />
    <ad-section-navbar />
    <slot />
    <ad-section-footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'front-office',
})
</script>
