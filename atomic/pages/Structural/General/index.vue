<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <ad-tile
        href="/structural/questions"
        header="Questions"
        :count="questions?.length"
        icon="pi pi-question"
        :count-secondary="questionCreatedLastWeek"
        text-secondary="this week"
        ad-type="question"
      />
    </div>

    <ad-card-chart
      v-if="display.Admin"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :question-data="questions"
      :chart-class="'myChart h-30rem'"
      :loading="!allLoaded"
    />

    <ad-question-dashboard
      :data="questions"
      :getData="getAllQuestions"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import { questionRequests, useDisplayCharts } from 'atomic'

const { display } = useDisplayCharts()

const {
  results: questions,
  createdLastWeek: questionCreatedLastWeek,
  loading: questionLoading,
  getAllQuestions,
  getCountQuestionsByCreatedLastWeek,
} = questionRequests()

onMounted(() => {
  getAllQuestions(true)
  getCountQuestionsByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch([questionLoading], ([newQuestionLoading]) => {
  if (!newQuestionLoading) {
    setTimeout(() => {
      allLoaded.value = true
    }, 200)
  }
})
</script>
