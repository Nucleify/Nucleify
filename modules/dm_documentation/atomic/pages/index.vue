<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Documentation"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ documentation: results }"
      :loading="loading"
    />
    <dm-documentation-dashboard
      :data="results"
      :get-data="getAllDocumentation"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { documentationRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()
const { results, loading, getAllDocumentation } =
  documentationRequests(closeDialog)

onMounted(() => {
  getAllDocumentation(true)
})
</script>
