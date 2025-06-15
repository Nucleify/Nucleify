<template>
  <div class="panel-container settings-panel-container">
    <skeleton-settings-card v-for="i in 2" :key="i" v-if="!isClient" />
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
