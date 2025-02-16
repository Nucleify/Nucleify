<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <ad-tile
        href="/entities/articles"
        header="Articles"
        :count="articles?.length"
        icon="pi pi-comment"
        :count-secondary="articlesCreatedLastWeek"
        text-secondary="this week"
        ad-type="article"
      />
      <ad-tile
        href="/entities/contacts"
        header="Contacts"
        :count="contacts?.length"
        icon="pi pi-user"
        :count-secondary="contactsCreatedLastWeek"
        text-secondary="this week"
        ad-type="contact"
      />
      <ad-tile
        href="/entities/money"
        header="Money"
        :count="money?.length"
        icon="pi pi-dollar"
        :count-secondary="moneyCreatedLastWeek"
        text-secondary="this week"
        ad-type="money"
      />
      <ad-tile
        href="/entities/questions"
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
      :article-data="articles"
      :contact-data="contacts"
      :money-data="money"
      :question-data="questions"
      :user-data="users"
      :chart-class="'myChart h-30rem'"
      :loading="!allLoaded"
    />

    <article-dashboard
      :data="articles"
      :getData="getAllArticles"
      :loading="!allLoaded"
    />
    <contact-dashboard
      :data="contacts"
      :getData="getAllContacts"
      :loading="!allLoaded"
    />
    <money-dashboard
      :data="money"
      :getData="getAllMoney"
      :loading="!allLoaded"
    />
    <question-dashboard
      :data="questions"
      :getData="getAllQuestions"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import {
  ArticleDashboard,
  ContactDashboard,
  MoneyDashboard,
  QuestionDashboard,
} from './'

import {
  articleRequests,
  contactRequests,
  moneyRequests,
  questionRequests,
  useDisplayCharts,
} from 'atomic'

const { display } = useDisplayCharts()

const {
  results: articles,
  createdLastWeek: articlesCreatedLastWeek,
  loading: articlesLoading,
  getAllArticles,
  getCountArticlesByCreatedLastWeek,
} = articleRequests()
const {
  results: contacts,
  createdLastWeek: contactsCreatedLastWeek,
  loading: contactsLoading,
  getAllContacts,
  getCountContactsByCreatedLastWeek,
} = contactRequests()
const {
  results: money,
  createdLastWeek: moneyCreatedLastWeek,
  loading: moneyLoading,
  getAllMoney,
  getCountMoneyByCreatedLastWeek,
} = moneyRequests()
const {
  results: questions,
  createdLastWeek: questionCreatedLastWeek,
  loading: questionLoading,
  getAllQuestions,
  getCountQuestionsByCreatedLastWeek,
} = questionRequests()

onMounted(() => {
  getAllArticles(true)
  getAllContacts(true)
  getAllMoney(true)
  getAllQuestions(true)
  getCountArticlesByCreatedLastWeek()
  getCountContactsByCreatedLastWeek()
  getCountMoneyByCreatedLastWeek()
  getCountQuestionsByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [articlesLoading, contactsLoading, moneyLoading, questionLoading],
  ([
    newArticlesLoading,
    newContactsLoading,
    newMoneyLoading,
    newQuestionLoading,
  ]) => {
    if (
      !newArticlesLoading &&
      !newContactsLoading &&
      !newMoneyLoading &&
      !newQuestionLoading
    ) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)
</script>

<style scoped>
:deep(.p-progress-spinner-circle) {
  stroke: #1ea97c;
  animation:
    p-progress-spinner-dash 1.2s ease-in-out infinite,
    p-progress-spinner-custom-color 6s ease-in-out infinite !important;
}

@keyframes p-progress-spinner-custom-color {
  0%,
  100% {
    stroke: var(--article-item-color);
  }
  25% {
    stroke: var(--contact-item-color);
  }
  50% {
    stroke: var(--money-item-color);
  }
}
</style>
