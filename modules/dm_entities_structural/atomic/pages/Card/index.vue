<template>
  <div class="panel-container">
    <template-card-chart
      v-if="display.Card"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :card-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-card-dashboard
      :data="results"
      :getData="getAllCards"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { cardRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { results, loading, getAllCards } = cardRequests(closeDialog)

onMounted(() => {
  getAllCards(true)
})
</script>
