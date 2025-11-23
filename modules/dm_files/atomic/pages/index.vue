<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="File"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ file: results }"
      :loading="loading"
    />

    <dm-file-dashboard
      :data="results"
      :get-data="getAllFiles"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { fileRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()

const { results, loading, getAllFiles } = fileRequests(closeDialog)

onMounted(() => {
  getAllFiles(true)
})
</script>
