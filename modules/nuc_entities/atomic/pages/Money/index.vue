<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Money"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ money: results }"
      :loading="loading"
    />
    <nuc-money-dashboard
      :data="results"
      :get-data="getAllMoney"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { moneyRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { loading, results, getAllMoney } = moneyRequests(closeDialog)

onMounted(() => {
  getAllMoney(true)
})
</script>
