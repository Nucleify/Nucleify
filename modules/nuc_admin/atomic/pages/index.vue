<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <dm-tiles :entities="entities" />

    <nuc-entity-chart-card
      entity="Admin"
      class="annual-chart-card"
      chart-method-type="annual"
      type="bar"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ 
        article: articles, 
        contact: contacts, 
        money: money, 
        user: users 
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
    <nuc-user-dashboard
      :data="users"
      :get-data="getAllUsers"
      :loading="!allLoaded"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'

import {
  articleRequests,
  contactRequests,
  moneyRequests,
  userRequests,
} from 'atomic'

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
  results: users,
  createdLastWeek: usersCreatedLastWeek,
  loading: usersLoading,
  getAllUsers,
  getCountUsersByCreatedLastWeek,
} = userRequests()

onMounted(() => {
  getAllArticles(true)
  getAllContacts(true)
  getAllMoney(true)
  getAllUsers(true)
  getCountArticlesByCreatedLastWeek()
  getCountContactsByCreatedLastWeek()
  getCountMoneyByCreatedLastWeek()
  getCountUsersByCreatedLastWeek()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
  [articlesLoading, contactsLoading, moneyLoading, usersLoading],
  ([
    newArticlesLoading,
    newContactsLoading,
    newMoneyLoading,
    newUsersLoading,
  ]) => {
    if (
      !newArticlesLoading &&
      !newContactsLoading &&
      !newMoneyLoading &&
      !newUsersLoading
    ) {
      setTimeout(() => {
        allLoaded.value = true
      }, 200)
    }
  }
)

const entities = computed(() => [
  {
    href: '/admin#articles',
    header: 'Articles',
    count: articles?.value?.length || 0,
    icon: 'prime:comment',
    countSecondary: articlesCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'article',
  },
  {
    href: '/admin#contacts',
    header: 'Contacts',
    count: contacts?.value?.length || 0,
    icon: 'prime:user',
    countSecondary: contactsCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'contact',
  },
  {
    href: '/admin#money',
    header: 'Money',
    count: money?.value?.length || 0,
    icon: 'prime:dollar',
    countSecondary: moneyCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'money',
  },
  {
    href: '/admin#users',
    header: 'Users',
    count: users?.value?.length || 0,
    icon: 'prime:user',
    countSecondary: usersCreatedLastWeek.value,
    textSecondary: 'this week',
    adType: 'user',
  },
])
</script>
