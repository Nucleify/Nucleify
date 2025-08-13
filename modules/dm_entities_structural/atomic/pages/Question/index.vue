<template>
  <div class="panel-container">
    <ad-card-chart
      entity="Question"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :question-data="results"
      :chart-class="'h-30rem'"
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

import { questionRequests, useDialog } from 'atomic'

const { closeDialog } = useDialog()

const { results, loading, getAllQuestions } = questionRequests(closeDialog)

onMounted(() => {
  getAllQuestions(true)
})
</script>
