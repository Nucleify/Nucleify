<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <ad-tile
        href="/structural/features"
        header="Features"
        :count="features?.length"
        icon="pi pi-star"
        :count-secondary="featuresCreatedLastWeek"
        text-secondary="this week"
        ad-type="feature"
      />
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
      :feature-data="features"
      :chart-class="'myChart h-30rem'"
      :loading="!allLoaded"
    />

    <dm-feature-dashboard
      :data="features"
      :getData="getAllFeatures"
      :loading="!allLoaded"
    />
    <dm-question-dashboard
      :data="questions"
      :getData="getAllQuestions"
      :loading="!allLoaded"
    />
    <dm-technology-dashboard
      :data="technologies"
      :getData="getAllTechnologies"
      :loading="!allLoaded"
    />
    <dm-link-dashboard
      :data="links"
      :getData="getAllLinks"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import {
  featureRequests,
  linkRequests,
  questionRequests,
  technologyRequests,
  useDisplayCharts,
} from 'atomic'

const { display } = useDisplayCharts()

const {
  results: features,
  createdLastWeek: featuresCreatedLastWeek,
  loading: featuresLoading,
  getAllFeatures,
  getCountFeaturesByCreatedLastWeek,
} = featureRequests()

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
  getAllFeatures(true)
  getCountFeaturesByCreatedLastWeek()
  getAllQuestions(true)
  getCountQuestionsByCreatedLastWeek()
  getAllTechnologies(true)
  getCountTechnologiesByCreatedLastWeek()
  getAllLinks(true)
  getCountLinksByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [questionsLoading, technologiesLoading, linksLoading, featuresLoading],
  ([
    newQuestionsLoading,
    newTechnologiesLoading,
    newLinksLoading,
    newFeaturesLoading,
  ]) => {
    if (
      !newQuestionsLoading &&
      !newTechnologiesLoading &&
      !newLinksLoading &&
      !newFeaturesLoading
    ) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)
</script>
