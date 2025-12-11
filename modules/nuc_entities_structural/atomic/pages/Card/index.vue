<template>
  <div class="panel-container">
    <nuc-entity-chart-card
      entity="Card"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ card: results }"
      :loading="loading"
    />
    <nuc-card-dashboard
      :data="results"
      :get-data="getAllCards"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { cardRequests, useNucDialog } from 'atomic'

const { closeDialog } = useNucDialog()

const { results, loading, getAllCards } = cardRequests(closeDialog)

onMounted(() => {
  getAllCards(true)
})
</script>
