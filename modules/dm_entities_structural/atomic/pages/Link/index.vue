<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Link"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ link: results }"
      :loading="loading"
    />
    <dm-link-dashboard
      :data="results"
      :get-data="getAllLinks"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { linkRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()

const { results, loading, getAllLinks } = linkRequests(closeDialog)

onMounted(() => {
  getAllLinks(true)
})
</script>
