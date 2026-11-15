<template>
  <nav v-if="links.length" class="nuc-cms-menu-nav" :aria-label="ariaLabel">
    <a v-for="link in links" :key="link.href + link.label" :href="link.href">
      {{ link.label }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { usePublicGlobal } from '../composables/use_public_globals'
import { usePublicMenu } from '../composables/use_public_menu'
import { useFramePage } from '../composables/use_frame_page'

const route = useRoute()
const frame = useFramePage()
const lang = computed(() => String(route.params.lang || 'en'))

const { global: header } = usePublicGlobal('header', lang)

const headerData = computed(() => header.value.data as Record<string, unknown>)

const resolvedSlug = computed(() => {
  const fromPage = String(frame.value.menuSlug || '').trim()
  if (fromPage) return fromPage
  const fromGlobal = String(headerData.value.menuSlug || '').trim()
  return fromGlobal || 'primary'
})

const { menu } = usePublicMenu(resolvedSlug, lang)

const ariaLabel = computed(() => menu.value.label || 'Primary')

const links = computed(() => {
  if (menu.value.items.length) {
    return menu.value.items.map((item) => ({
      label: item.label,
      href: item.href,
    }))
  }
  const raw = headerData.value.links
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

<style scoped>
.nuc-cms-menu-nav {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
}
</style>
