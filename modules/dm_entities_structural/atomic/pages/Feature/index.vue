<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Feature"
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
      :get-data="getAllFeatures"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { featureRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllFeatures } = featureRequests(closeDialog)

onMounted(() => {
  getAllFeatures(true)
})
</script>
