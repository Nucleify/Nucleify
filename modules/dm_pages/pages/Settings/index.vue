<template>
  <div class="panel-container settings-panel-container">
    <template v-if="!isClient">
      <skeleton-settings-card v-for="i in 2" :key="i" />
    </template>
    <client-only>
      <color-settings />
      <display-charts />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ColorSettings, DisplayCharts, SkeletonSettingsCard } from 'atomic'
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 0;
}
</style>
