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
    <nuc-technology-dashboard
      :data="results"
      :get-data="getAllTechnologies"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { technologyRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { results, loading, getAllTechnologies } = technologyRequests(closeDialog)

onMounted(() => {
  getAllTechnologies(true)
})
</script>
