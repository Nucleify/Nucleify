<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Technology"
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
      :getData="getAllTechnologies"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { technologyRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { results, loading, getAllTechnologies } = technologyRequests(closeDialog)

onMounted(() => {
  getAllTechnologies(true)
})
</script>
