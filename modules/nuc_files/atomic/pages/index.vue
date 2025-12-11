<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="File"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ file: results }"
      :loading="loading"
    />

    <nuc-file-dashboard
      :data="results"
      :get-data="getAllFiles"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { fileRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { results, loading, getAllFiles } = fileRequests(closeDialog)

onMounted(() => {
  getAllFiles(true)
})
</script>
