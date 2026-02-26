<template>
  <div id="default">
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  bodyAttrs: { class: 'nuc-system' },
})
</script>