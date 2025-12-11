<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <nuc-tiles :entities="entities" />

    <nuc-entity-chart-card
      entity="Entities"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ 
        article: articles, 
        contact: contacts, 
        money: money 
      }"
      :loading="!allLoaded"
    />

    <nuc-article-dashboard
      :data="articles"
      :get-data="getAllArticles"
      :loading="!allLoaded"
    />
    <nuc-contact-dashboard
      :data="contacts"
      :get-data="getAllContacts"
      :loading="!allLoaded"
    />
    <nuc-money-dashboard
      :data="money"
      :get-data="getAllMoney"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import type { TileInterface } from 'atomic'
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
  ([articlesLoading, contactsLoading, moneyLoading]: [
    boolean,
    boolean,
    boolean,
  ]) => {
    if (!articlesLoading && !contactsLoading && !moneyLoading) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)

const entities = computed<TileInterface[]>(() => [
  {
    href: '/entities/articles',
    header: 'Articles',
    count: articles.value?.length || 0,
    icon: 'prime:comment',
    countSecondary: articlesCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'article',
  },
  {
    href: '/entities/contacts',
    header: 'Contacts',
    count: contacts.value?.length || 0,
    icon: 'prime:user',
    countSecondary: contactsCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'contact',
  },
  {
    href: '/entities/money',
    header: 'Money',
    count: money.value?.length || 0,
    icon: 'prime:dollar',
    countSecondary: moneyCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'money',
  },
])
</script>
