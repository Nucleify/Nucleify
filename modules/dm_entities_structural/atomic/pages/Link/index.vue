<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Link"
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
      :get-data="getAllLinks"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { linkRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllLinks } = linkRequests(closeDialog)

onMounted(() => {
  getAllLinks(true)
})
</script>
