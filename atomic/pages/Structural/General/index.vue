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
      <ad-tile
        href="/structural/links"
        header="Links"
        :count="links?.length"
        icon="pi pi-link"
        :count-secondary="linksCreatedLastWeek"
        text-secondary="this week"
        ad-type="link"
      />
    </div>

    <ad-card-chart
      v-if="display.Structural"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :link-data="links"
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
      :getData="getAllTechnologies"
      :loading="!allLoaded"
    />
    <ad-link-dashboard
      :data="links"
      :getData="getAllLinks"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import {
  linkRequests,
  questionRequests,
  technologyRequests,
  useDisplayCharts,
} from 'atomic'

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

const {
  results: links,
  createdLastWeek: linksCreatedLastWeek,
  loading: linksLoading,
  getAllLinks,
  getCountLinksByCreatedLastWeek,
} = linkRequests()

onMounted(() => {
  getAllQuestions(true)
  getCountQuestionsByCreatedLastWeek()
  getAllTechnologies(true)
  getCountTechnologiesByCreatedLastWeek()
  getAllLinks(true)
  getCountLinksByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [questionsLoading, technologiesLoading, linksLoading],
  ([newQuestionsLoading, newTechnologiesLoading, newLinksLoading]) => {
    if (!newQuestionsLoading && !newTechnologiesLoading && !newLinksLoading) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)
</script>
