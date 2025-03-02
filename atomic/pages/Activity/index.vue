<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Activity"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :activity-log-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-activity-dashboard
      :data="results"
      :getData="getAllActivities"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { activityRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()
const { display } = useDisplayCharts()

const { results, loading, getAllActivities } = activityRequests(closeDialog)

onMounted(() => {
  getAllActivities(true)
})
</script>
