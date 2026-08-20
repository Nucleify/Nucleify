<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()
const lang = String(route.params.lang || 'en')

await navigateTo(`/${lang}/home`, { redirectCode: 302 })
</script>
