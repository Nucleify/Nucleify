<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Article"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :article-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-article-dashboard
      :data="results"
      :getData="getAllArticles"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { articleRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()
const { display } = useDisplayCharts()

const { results, loading, getAllArticles } = articleRequests(closeDialog)

onMounted(() => {
  getAllArticles(true)
})
</script>
