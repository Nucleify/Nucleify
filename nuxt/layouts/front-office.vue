<template>
  <div id="front-office">
    <nuc-section-navbar />
    <main>
      <slot />
    </main>
    <nuc-section-footer />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'front-office',
})
</script>
