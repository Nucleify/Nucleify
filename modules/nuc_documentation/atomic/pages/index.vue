<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Documentation"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ documentation: results }"
      :loading="loading"
    />
    <nuc-documentation-dashboard
      :data="results"
      :get-data="getAllDocumentation"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { documentationRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()
const { results, loading, getAllDocumentation } =
  documentationRequests(closeDialog)

onMounted(() => {
  getAllDocumentation(true)
})
</script>
