<template>
  <div class="panel-container">
    <dm-entity-chart-card
      entity="Question"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ question: results }"
      :loading="loading"
    />
    <dm-question-dashboard
      :data="results"
      :get-data="getAllQuestions"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { questionRequests, useAtomicDialog } from 'atomic'

const { closeDialog } = useAtomicDialog()

const { results, loading, getAllQuestions } = questionRequests(closeDialog)

onMounted(() => {
  getAllQuestions(true)
})
</script>
