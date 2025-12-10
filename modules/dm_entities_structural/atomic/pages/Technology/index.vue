<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Technology"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ technology: results }"
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

import { technologyRequests, useDmDialog } from 'atomic'

const { closeDialog } = useDmDialog()

const { results, loading, getAllTechnologies } = technologyRequests(closeDialog)

onMounted(() => {
  getAllTechnologies(true)
})
</script>
