<template>
  <div class="panel-container">
    <polar-area-chart
      :articles="articles!"
      :contacts="contacts!"
      :money="money!"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import { PolarAreaChart } from './components'

import {
  articleRequests,
  contactRequests,
  moneyRequests,
  useColors,
  useDisplayCharts,
} from 'atomic'

const { setDefaultColors } = useColors()
const { setDefaultChartsDisplay } = useDisplayCharts()

onMounted(() => {
  setDefaultColors(true)
  setDefaultChartsDisplay(true)
})

const {
  results: articles,
  loading: articlesLoading,
  getAllArticles,
  getCountArticlesByCreatedLastWeek,
} = articleRequests()

const {
  results: contacts,
  loading: contactsLoading,
  getAllContacts,
  getCountContactsByCreatedLastWeek,
} = contactRequests()

const {
  results: money,
  loading: moneyLoading,
  getAllMoney,
  getCountMoneyByCreatedLastWeek,
} = moneyRequests()

onMounted(() => {
  getAllArticles(true)
  getAllContacts(true)
  getAllMoney(true)
  getCountArticlesByCreatedLastWeek()
  getCountContactsByCreatedLastWeek()
  getCountMoneyByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [articlesLoading, contactsLoading, moneyLoading],
  ([newArticlesLoading, newContactsLoading, newMoneyLoading]) => {
    if (!newArticlesLoading && !newContactsLoading && !newMoneyLoading) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)
</script>

<style lang="scss">
#dashboard .panel-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
