<template>
  <div
    id="back-office"
    :class="{ 'toolbar-sidebar': effectiveToolbarStyle === 'sidebar' }"
  >
    <nuc-sidebar v-if="effectiveToolbarStyle === 'sidebar'" />
    <main><slot /></main>
    <nuc-dock v-if="effectiveToolbarStyle === 'dock'" />
  </div>
</template>

<script setup lang="ts">
import { useToolbarStyle } from 'nucleify'

useHead({
  pageTransition: { name: 'page', mode: 'out-in' },
})

const { effectiveToolbarStyle } = useToolbarStyle()
</script>
