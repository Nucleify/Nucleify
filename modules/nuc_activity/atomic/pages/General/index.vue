<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Activity"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ activity: results }"
      :loading="loading"
    />
    <nuc-activity-dashboard
      :data="results"
      :get-data="getAllActivities"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { activityRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { results, loading, getAllActivities } = activityRequests(closeDialog)

onMounted(() => {
  getAllActivities(true)
})
</script>
