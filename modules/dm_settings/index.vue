<template>
  <div class="panel-container settings-panel-container">
    <template v-if="!isClient">
      <dm-skeleton-settings-card v-for="i in 2" :key="i" />
    </template>
    <client-only>
      <dm-color-settings />
      <dm-display-charts />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import {
  DmColorSettings,
  DmDisplayCharts,
  DmSkeletonSettingsCard,
} from './components'
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 0;
}
</style>
