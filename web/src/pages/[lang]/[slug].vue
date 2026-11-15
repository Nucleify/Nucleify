<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import FrameSections from '@shared_modules/nuc_cms/components/FrameSections'
import { usePublicFramePage } from '@shared_modules'
import { useFramePage } from '@shared_modules'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

await usePublicFramePage(slug)

const frame = useFramePage()
const sections = computed(() => frame.value.sections)
const showPending = computed(
  () => frame.value.pending && sections.value.length === 0
)
</script>

<template>
  <p v-if="showPending" class="nuc-frame__status">Loading…</p>
  <Suspense v-else>
    <FrameSections :sections="sections" />
  </Suspense>
</template>

<style scoped>
.nuc-frame__status {
  min-height: 100%;
  margin: 0;
  padding: 1rem 1.5rem;
  background: var(--frame-bg, #03050c);
  color: var(--frame-muted, #8a8a8a);
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
}
</style>
