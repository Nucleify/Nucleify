<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <ad-tile
        href="/structural/cards"
        header="Cards"
        :count="cards?.length"
        icon="prime:stop"
        :count-secondary="cardsCreatedLastWeek"
        text-secondary="this week"
        ad-type="card"
      />
      <ad-tile
        href="/structural/features"
        header="Features"
        :count="features?.length"
        icon="prime:star"
        :count-secondary="featuresCreatedLastWeek"
        text-secondary="this week"
        ad-type="feature"
      />
      <ad-tile
        href="/structural/questions"
        header="Questions"
        :count="questions?.length"
        icon="prime:question"
        :count-secondary="questionsCreatedLastWeek"
        text-secondary="this week"
        ad-type="question"
      />
      <ad-tile
        href="/structural/technologies"
        header="Technologies"
        :count="technologies?.length"
        icon="prime:microchip-ai"
        :count-secondary="technologiesCreatedLastWeek"
        text-secondary="this week"
        ad-type="technology"
      />
      <ad-tile
        href="/structural/links"
        header="Links"
        :count="links?.length"
        icon="prime:link"
        :count-secondary="linksCreatedLastWeek"
        text-secondary="this week"
        ad-type="link"
      />
    </div>

    <ad-card-chart
      entity="Structural"
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
      :get-data="getAllCards"
      :loading="!allLoaded"
    />
    <dm-feature-dashboard
      :data="features"
      :get-data="getAllFeatures"
      :loading="!allLoaded"
    />
    <dm-link-dashboard
      :data="links"
      :get-data="getAllLinks"
      :loading="!allLoaded"
    />
    <dm-question-dashboard
      :data="questions"
      :get-data="getAllQuestions"
      :loading="!allLoaded"
    />
    <dm-technology-dashboard
      :data="technologies"
      :get-data="getAllTechnologies"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'

import {
  cardRequests,
  featureRequests,
  linkRequests,
  questionRequests,
  technologyRequests,
} from 'atomic'

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
