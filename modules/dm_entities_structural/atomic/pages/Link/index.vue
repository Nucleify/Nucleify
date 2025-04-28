<template>
  <div class="panel-container">
    <template-card-chart
      v-if="display.Link"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :link-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-link-dashboard
      :data="results"
      :getData="getAllLinks"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { linkRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { results, loading, getAllLinks } = linkRequests(closeDialog)

onMounted(() => {
  getAllLinks(true)
})
</script>
