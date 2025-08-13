<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Technology"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :technology-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-technology-dashboard
      :data="results"
      :get-data="getAllTechnologies"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { technologyRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllTechnologies } = technologyRequests(closeDialog)

onMounted(() => {
  getAllTechnologies(true)
})
</script>
