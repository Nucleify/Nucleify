<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Article"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ article: results }"
      :loading="loading"
    />
    <nuc-article-dashboard
      :data="results"
      :get-data="getAllArticles"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { articleRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { results, loading, getAllArticles } = articleRequests(closeDialog)

onMounted(() => {
  getAllArticles(true)
})
</script>
