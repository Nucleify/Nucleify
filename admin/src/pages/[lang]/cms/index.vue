<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

await navigateTo(`/${lang.value}/collections/pages`, {
  redirectCode: 302,
  replace: true,
})
</script>
