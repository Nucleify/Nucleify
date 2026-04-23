<template>
  <div id="front-office">
    <nuc-section-navbar />
    <nuc-breadcrumb />
    <main><slot /></main>
    <nuc-section-footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'front-office',
})

useHead({
  bodyAttrs: { class: 'nuc-system' },
})
</script>
