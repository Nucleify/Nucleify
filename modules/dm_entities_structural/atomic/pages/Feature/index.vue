<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Feature"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ feature: results }"
      :loading="loading"
    />
    <dm-feature-dashboard
      :data="results"
      :get-data="getAllFeatures"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { featureRequests, useDmDialog } from 'atomic'

const { closeDialog } = useDmDialog()

const { results, loading, getAllFeatures } = featureRequests(closeDialog)

onMounted(() => {
  getAllFeatures(true)
})
</script>
