<template>
  <div class="panel-container settings-panel-container">
    <color-settings class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2" />
    <display-charts class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2" />
  </div>
</template>

<script setup lang="ts">
import { ColorSettings, DisplayCharts } from 'atomic'
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 0;
}
</style>
