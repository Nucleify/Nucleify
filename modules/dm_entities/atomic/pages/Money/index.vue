<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Money"
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
      :get-data="getAllMoney"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { moneyRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { loading, results, getAllMoney } = moneyRequests(closeDialog)

onMounted(() => {
  getAllMoney(true)
})
</script>
