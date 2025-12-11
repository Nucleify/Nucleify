<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Link"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ link: results }"
      :loading="loading"
    />
    <nuc-link-dashboard
      :data="results"
      :get-data="getAllLinks"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { linkRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { results, loading, getAllLinks } = linkRequests(closeDialog)

onMounted(() => {
  getAllLinks(true)
})
</script>
