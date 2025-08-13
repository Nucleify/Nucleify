<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Activity"
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

import { activityRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllActivities } = activityRequests(closeDialog)

onMounted(() => {
  getAllActivities(true)
})
</script>
