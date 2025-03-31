<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Feature"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :feature-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-feature-dashboard
      :data="results"
      :getData="getAllFeatures"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { featureRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { results, loading, getAllFeatures } = featureRequests(closeDialog)

onMounted(() => {
  getAllFeatures(true)
})
</script>
