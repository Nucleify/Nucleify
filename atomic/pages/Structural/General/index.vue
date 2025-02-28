<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <ad-tile
        href="/structural/questions"
        header="Questions"
        :count="questions?.length"
        icon="pi pi-question"
        :count-secondary="questionsCreatedLastWeek"
        text-secondary="this week"
        ad-type="question"
      />
      <ad-tile
        href="/structural/technologies"
        header="Technologies"
        :count="technologies?.length"
        icon="pi pi-microchip-ai"
        :count-secondary="technologiesCreatedLastWeek"
        text-secondary="this week"
        ad-type="technology"
      />
    </div>

    <ad-card-chart
      v-if="display.Structural"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :question-data="questions"
      :technology-data="technologies"
      :chart-class="'myChart h-30rem'"
      :loading="!allLoaded"
    />

    <ad-question-dashboard
      :data="questions"
      :getData="getAllQuestions"
      :loading="!allLoaded"
    />
    <ad-technology-dashboard
      :data="technologies"
      :getData="getAllQuestions"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import { questionRequests, technologyRequests, useDisplayCharts } from 'atomic'

const { display } = useDisplayCharts()

const {
  results: questions,
  createdLastWeek: questionsCreatedLastWeek,
  loading: questionsLoading,
  getAllQuestions,
  getCountQuestionsByCreatedLastWeek,
} = questionRequests()

const {
  results: technologies,
  createdLastWeek: technologiesCreatedLastWeek,
  loading: technologiesLoading,
  getAllTechnologies,
  getCountTechnologiesByCreatedLastWeek,
} = technologyRequests()

onMounted(() => {
  getAllQuestions(true)
  getCountQuestionsByCreatedLastWeek()
  getAllTechnologies(true)
  getCountTechnologiesByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [questionsLoading, technologiesLoading],
  ([newQuestionsLoading, newTechnologiesLoading]) => {
    if (!newQuestionsLoading && !newTechnologiesLoading) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)
</script>
