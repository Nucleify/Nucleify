<template>
  <nav
    v-if="links.length"
    class="nuc-cms-header-nav"
    aria-label="Primary"
    style="
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      padding: 0.75rem 1.25rem;
      font-size: 0.9rem;
    "
  >
    <a v-for="link in links" :key="link.href + link.label" :href="link.href">
      {{ link.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { usePublicGlobal } from '../composables/use_public_globals'

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

const { global: header } = usePublicGlobal('header', lang)

const links = computed(() => {
  const raw = header.value.data?.links
  if (!Array.isArray(raw)) return [] as { label: string; href: string }[]
  return raw
    .filter((item): item is Record<string, unknown> =>
      Boolean(item && typeof item === 'object' && !Array.isArray(item))
    )
    .map((item) => ({
      label: String(item.label || '').trim(),
      href: String(item.href || '').trim(),
    }))
    .filter((item) => item.label && item.href)
})
</script>
