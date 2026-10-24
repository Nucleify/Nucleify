<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const id = computed(() => String(route.params.id || ''))
await navigateTo(`/${lang.value}/collections/users/${id.value}`, {
  redirectCode: 302,
  replace: true,
})
</script>
