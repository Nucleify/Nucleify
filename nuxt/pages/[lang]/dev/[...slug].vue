<template>
  <div v-if="page" :id="page.id">
    <nuc-grid-background v-if="page.grid" />
    <component :is="page.component" />
  </div>
  <nuc-error-404-page v-else />
</template>

<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

const route = useRoute()

const slug = computed(() => {
  const parts = route.params.slug
  return Array.isArray(parts) ? parts.join('/') : String(parts ?? '')
})

const pageMap: Record<string, { id: string; grid: boolean }> = {
  offer: { id: 'offer', grid: true },
  'about-us': { id: 'about-us', grid: true },
  process: { id: 'process-page', grid: true },
  services: { id: 'services', grid: true },
  'services/business-websites': { id: 'business-websites', grid: true },
  'services/ecommerce-stores': { id: 'ecommerce-stores', grid: true },
  'services/landing-pages': { id: 'landing-pages', grid: true },
  'services/website-redesign': { id: 'website-redesign', grid: true },
  'services/custom-projects': { id: 'custom-projects', grid: true },
  'privacy-policy': { id: 'privacy-policy', grid: false },
  'terms-of-service': { id: 'terms-of-service', grid: false },
  cookies: { id: 'cookies', grid: false },
  gdpr: { id: 'gdpr', grid: false },
}

const page = computed(() => {
  const entry = pageMap[slug.value]
  if (!entry) return null

  const componentName = `nuc-${entry.id}-page`
  return {
    ...entry,
    component: resolveComponent(componentName),
  }
})
</script>
