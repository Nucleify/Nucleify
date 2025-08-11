<template>
  <div class="panel-container">
    <ad-card-chart
      entity="File"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :file-data="results"
      :chart-class="'h-30rem'"
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

import { fileRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllFiles } = fileRequests(closeDialog)

onMounted(() => {
  getAllFiles(true)
})
</script>
