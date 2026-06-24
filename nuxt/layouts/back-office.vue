<template>
  <div id="back-office">
    <main><slot /></main>
    <nuc-dock />
  </div>
</template>

<script setup lang="ts">
useHead({
  pageTransition: { name: 'page', mode: 'out-in' },
})
</script>
