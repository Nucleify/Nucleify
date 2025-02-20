<template>
  <div class="panel-container">
    <ad-card-chart
      v-if="display.Question"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :question-data="results"
      :chart-class="'h-30rem'"
      :loading="loading"
    />
    <ad-question-dashboard
      :data="results"
      :getData="getAllQuestions"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { questionRequests, useDialog, useDisplayCharts } from 'atomic'

const { closeDialog } = useDialog()

const { display } = useDisplayCharts()

const { results, loading, getAllQuestions } = questionRequests(closeDialog)

onMounted(() => {
  getAllQuestions(true)
})
</script>
