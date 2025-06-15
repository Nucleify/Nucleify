<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="displayCharts.Article"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :article-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-article-dashboard
      :data="results"
      :get-data="getAllArticles"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { articleRequests, useDialog, useDisplayChartsStore } from 'atomic'

const { closeDialog } = useDialog()
const displayCharts = useDisplayChartsStore()

const { results, loading, getAllArticles } = articleRequests(closeDialog)

onMounted(() => {
  getAllArticles(true)
})
</script>
