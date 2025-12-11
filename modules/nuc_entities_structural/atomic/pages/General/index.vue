<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <nuc-tiles :entities="entities" />

    <nuc-entity-chart-card
      entity="Structural"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ 
        card: cards, 
        link: links, 
        question: questions, 
        technology: technologies, 
        feature: features 
      }"
      :loading="!allLoaded"
    />

    <nuc-card-dashboard
      :data="cards"
      :get-data="getAllCards"
      :loading="!allLoaded"
    />
    <nuc-feature-dashboard
      :data="features"
      :get-data="getAllFeatures"
      :loading="!allLoaded"
    />
    <nuc-link-dashboard
      :data="links"
      :get-data="getAllLinks"
      :loading="!allLoaded"
    />
    <nuc-question-dashboard
      :data="questions"
      :get-data="getAllQuestions"
      :loading="!allLoaded"
    />
    <nuc-technology-dashboard
      :data="technologies"
      :get-data="getAllTechnologies"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import type { TileInterface } from 'atomic'
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
    cardsLoading,
    featuresLoading,
    linksLoading,
    questionsLoading,
    technologiesLoading,
  ]: [boolean, boolean, boolean, boolean, boolean]) => {
    if (
      !cardsLoading &&
      !featuresLoading &&
      !linksLoading &&
      !questionsLoading &&
      !technologiesLoading
    ) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)

const entities = computed<TileInterface[]>(() => [
  {
    href: '/structural/cards',
    header: 'Cards',
    count: cards.value?.length || 0,
    icon: 'prime:stop',
    countSecondary: cardsCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'card',
  },
  {
    href: '/structural/features',
    header: 'Features',
    count: features.value?.length || 0,
    icon: 'prime:star',
    countSecondary: featuresCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'feature',
  },
  {
    href: '/structural/questions',
    header: 'Questions',
    count: questions.value?.length || 0,
    icon: 'prime:question',
    countSecondary: questionsCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'question',
  },
  {
    href: '/structural/technologies',
    header: 'Technologies',
    count: technologies.value?.length || 0,
    icon: 'prime:microchip-ai',
    countSecondary: technologiesCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'technology',
  },
  {
    href: '/structural/links',
    header: 'Links',
    count: links.value?.length || 0,
    icon: 'prime:link',
    countSecondary: linksCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'link',
  },
])
</script>
