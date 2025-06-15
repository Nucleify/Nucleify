<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="displayCharts.Activity"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :activity-log-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-activity-dashboard
      :data="results"
      :get-data="getAllActivities"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { activityRequests, useDialog, useDisplayChartsStore } from 'atomic'

const { closeDialog } = useDialog()
const displayCharts = useDisplayChartsStore()

const { results, loading, getAllActivities } = activityRequests(closeDialog)

onMounted(() => {
  getAllActivities(true)
})
</script>
