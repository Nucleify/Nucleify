<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import ShellSections from '../../components/ShellSections'
import { usePublicShellPage } from '../../composables/use_public_shell_page'
import { useShellPage } from '../../composables/use_shell_page'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

await usePublicShellPage(slug)

const shell = useShellPage()
const sections = computed(() => shell.value.sections)
const showPending = computed(
  () => shell.value.pending && sections.value.length === 0
)
</script>

<template>
  <p v-if="showPending" class="nuc-shell__status">Loading…</p>
  <ShellSections v-else :sections="sections" />
</template>

<style scoped>
.nuc-shell__status {
  min-height: 100%;
  margin: 0;
  padding: 1rem 1.5rem;
  background: var(--shell-bg, #03050c);
  color: var(--shell-muted, #8a8a8a);
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
}
</style>
