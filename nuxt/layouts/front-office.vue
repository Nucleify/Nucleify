<template>
  <div id="front-office">
    <nuc-section-navbar />
    <nuc-grid-background />
    <main><slot /></main>
    <ad-spacing />
    <nuc-section-footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: { class: 'nuc-system' },
})
</script>
