<template>
  <div class="panel-container settings-panel-container">
    <color-settings />
    <display-charts />
  </div>
</template>

<script setup lang="ts">
import { ColorSettings, DisplayCharts } from '@/components'
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 0;
}
</style>
