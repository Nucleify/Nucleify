<template>
  <div v-if="page" :id="page.id"><component :is="page.component" /></div>
  <nuc-error-404-page v-else />
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

import { DEV_PAGE_MAP, getDevPageComponentName } from 'nucleify'

const route = useRoute()

const slug = computed(() => {
  const parts = route.params.slug
  return Array.isArray(parts) ? parts.join('/') : String(parts ?? '')
})

const page = computed(() => {
  const entry = DEV_PAGE_MAP[slug.value]
  if (!entry) return null

  const componentName = getDevPageComponentName(entry.id)
  return {
    ...entry,
    component: resolveComponent(componentName),
  }
})
</script>
