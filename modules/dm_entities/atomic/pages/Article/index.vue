<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Article"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ article: results }"
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

import { articleRequests, useDmDialog } from 'atomic'

const { closeDialog } = useDmDialog()

const { results, loading, getAllArticles } = articleRequests(closeDialog)

onMounted(() => {
  getAllArticles(true)
})
</script>
