<template>
  <div id="default">
    <main><slot /></main>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: { class: 'nuc-system' },
})
</script>
