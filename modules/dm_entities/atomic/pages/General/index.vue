<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="tiles grid col-12">
      <ad-tile
        href="/entities/articles"
        header="Articles"
        :count="articles?.length"
        icon="prime:comment"
        :count-secondary="articlesCreatedLastWeek"
        text-secondary="this week"
        ad-type="article"
      />
      <ad-tile
        href="/entities/contacts"
        header="Contacts"
        :count="contacts?.length"
        icon="prime:user"
        :count-secondary="contactsCreatedLastWeek"
        text-secondary="this week"
        ad-type="contact"
      />
      <ad-tile
        href="/entities/money"
        header="Money"
        :count="money?.length"
        icon="prime:dollar"
        :count-secondary="moneyCreatedLastWeek"
        text-secondary="this week"
        ad-type="money"
      />
    </div>

    <ad-card-chart
      entity="Entities"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :article-data="articles"
      :contact-data="contacts"
      :money-data="money"
      :chart-class="'myChart h-30rem'"
      :loading="!allLoaded"
    />

    <dm-article-dashboard
      :data="articles"
      :get-data="getAllArticles"
      :loading="!allLoaded"
    />
    <dm-contact-dashboard
      :data="contacts"
      :get-data="getAllContacts"
      :loading="!allLoaded"
    />
    <dm-money-dashboard
      :data="money"
      :get-data="getAllMoney"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'

import { articleRequests, contactRequests, moneyRequests } from 'atomic'

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
