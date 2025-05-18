<template>
  <div class="panel-container">
    <template-card-chart
      v-if="display.Money"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :money-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <dm-money-dashboard
      :data="results"
      :getData="getAllMoney"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { moneyRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { loading, results, getAllMoney } = moneyRequests(closeDialog)

onMounted(() => {
  getAllMoney(true)
})
</script>
