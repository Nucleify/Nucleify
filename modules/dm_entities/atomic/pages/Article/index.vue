<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Article"
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

import { articleRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllArticles } = articleRequests(closeDialog)

onMounted(() => {
  getAllArticles(true)
})
</script>
