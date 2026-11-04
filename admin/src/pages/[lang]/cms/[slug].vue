<template>
  <div />
</template>

<script setup lang="ts">
const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const slug = computed(() => String(route.params.slug || ''))

// Legacy markdown editor removed from nav — send editors to JSON pages.
await navigateTo(
  slug.value
    ? `/${lang.value}/collections/pages`
    : `/${lang.value}/collections/pages`,
  { redirectCode: 302, replace: true }
)
</script>
