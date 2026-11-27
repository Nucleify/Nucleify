<template>
  <div v-if="error" class="nuc-frame__status">{{ error }}</div>
  <p v-else-if="showPending && !embedded" class="nuc-frame__status">
    Loading preview…
  </p>
  <template v-else-if="!showPending || embedded">
    <p v-if="!embedded" class="nuc-preview-banner">
      Draft preview — not published
    </p>
    <Suspense v-if="sections.length">
      <FrameSections :sections="sections" />
    </Suspense>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'

import FrameSections from '@shared_modules/nuc_cms/components/FrameSections'
import { usePreviewFramePage } from '@shared_modules'

const route = useRoute()
const { pending, error, frame } = usePreviewFramePage()

const sections = computed(() => frame.value.sections)
const showPending = computed(() => pending.value && sections.value.length === 0)
const embedded = computed(() => String(route.query.embed || '') === '1')
</script>

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

.nuc-preview-banner {
  position: sticky;
  top: 0;
  z-index: 50;
  margin: 0;
  padding: 0.5rem 1rem;
  background: #111;
  color: #fbbf24;
  font-size: 0.85rem;
}
</style>
