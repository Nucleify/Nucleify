<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Activity"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ activity: results }"
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

import { activityRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()

const { results, loading, getAllActivities } = activityRequests(closeDialog)

onMounted(() => {
  getAllActivities(true)
})
</script>
