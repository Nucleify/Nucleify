<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <molecule-tile
        href="/structural/cards"
        header="Cards"
        :count="cards?.length"
        icon="pi pi-stop"
        :count-secondary="cardsCreatedLastWeek"
        text-secondary="this week"
        ad-type="card"
      />
      <molecule-tile
        href="/structural/features"
        header="Features"
        :count="features?.length"
        icon="pi pi-star"
        :count-secondary="featuresCreatedLastWeek"
        text-secondary="this week"
        ad-type="feature"
      />
      <molecule-tile
        href="/structural/questions"
        header="Questions"
        :count="questions?.length"
        icon="pi pi-question"
        :count-secondary="questionsCreatedLastWeek"
        text-secondary="this week"
        ad-type="question"
      />
      <molecule-tile
        href="/structural/technologies"
        header="Technologies"
        :count="technologies?.length"
        icon="pi pi-microchip-ai"
        :count-secondary="technologiesCreatedLastWeek"
        text-secondary="this week"
        ad-type="technology"
      />
      <molecule-tile
        href="/structural/links"
        header="Links"
        :count="links?.length"
        icon="pi pi-link"
        :count-secondary="linksCreatedLastWeek"
        text-secondary="this week"
        ad-type="link"
      />
    </div>

    <template-card-chart
      v-if="display.Structural"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :card-data="cards"
      :link-data="links"
      :question-data="questions"
      :technology-data="technologies"
      :feature-data="features"
      :chart-class="'myChart h-30rem'"
      :loading="!allLoaded"
    />

    <dm-card-dashboard
      :data="cards"
      :getData="getAllCards"
      :loading="!allLoaded"
    />
    <dm-feature-dashboard
      :data="features"
      :getData="getAllFeatures"
      :loading="!allLoaded"
    />
    <dm-link-dashboard
      :data="links"
      :getData="getAllLinks"
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import {
  cardRequests,
  featureRequests,
  linkRequests,
  questionRequests,
  technologyRequests,
  useDisplayCharts,
} from 'atomic'

const { display } = useDisplayCharts()

const {
  results: cards,
  createdLastWeek: cardsCreatedLastWeek,
  loading: cardsLoading,
  getAllCards,
  getCountCardsByCreatedLastWeek,
} = cardRequests()

const {
  results: features,
  createdLastWeek: featuresCreatedLastWeek,
  loading: featuresLoading,
  getAllFeatures,
  getCountFeaturesByCreatedLastWeek,
} = featureRequests()

const {
  results: links,
  createdLastWeek: linksCreatedLastWeek,
  loading: linksLoading,
  getAllLinks,
  getCountLinksByCreatedLastWeek,
} = linkRequests()

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
  getAllCards(true)
  getCountCardsByCreatedLastWeek()
  getAllFeatures(true)
  getCountFeaturesByCreatedLastWeek()
  getAllLinks(true)
  getCountLinksByCreatedLastWeek()
  getAllQuestions(true)
  getCountQuestionsByCreatedLastWeek()
  getAllTechnologies(true)
  getCountTechnologiesByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [
    cardsLoading,
    featuresLoading,
    linksLoading,
    questionsLoading,
    technologiesLoading,
  ],
  ([
    newCardsLoading,
    newFeaturesLoading,
    newLinksLoading,
    newQuestionsLoading,
    newTechnologiesLoading,
  ]) => {
    if (
      !newCardsLoading &&
      !newFeaturesLoading &&
      !newLinksLoading &&
      !newQuestionsLoading &&
      !newTechnologiesLoading
    ) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)
</script>
