<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="admin-tiles grid col-12">
      <ad-tile
        href="#articles"
        :header="t('admin.tiles.article.header')"
        :count="articles?.length"
        icon="prime:comment"
        :count-secondary="articlesCreatedLastWeek"
        :text-secondary="t('admin.tiles.secondaryText')"
        ad-type="article"
      />
      <ad-tile
        href="#contacts"
        :header="t('admin.tiles.contacts.header')"
        :count="contacts?.length"
        icon="prime:user"
        :count-secondary="contactsCreatedLastWeek"
        :text-secondary="t('admin.tiles.secondaryText')"
        ad-type="contact"
      />
      <ad-tile
        href="#money"
        :header="t('admin.tiles.money.header')"
        :count="money?.length"
        icon="prime:dollar"
        :count-secondary="moneyCreatedLastWeek"
        :text-secondary="t('admin.tiles.secondaryText')"
        ad-type="money"
      />
      <ad-tile
        href="#users"
        :header="t('admin.tiles.users.header')"
        :count="users?.length"
        icon="prime:user"
        :count-secondary="usersCreatedLastWeek"
        :text-secondary="t('admin.tiles.secondaryText')"
        ad-type="user"
      />
    </div>

    <dm-entity-chart-card
      entity="Admin"
      class="annual-chart-card"
      :chart-method-type="'annual'"
      :type="'bar'"
      :direction="isMobile() ? 'horizontal' : 'vertical'"
      :data="{ 
        article: articles, 
        contact: contacts, 
        money: money, 
        user: users 
      }"
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
    <dm-user-dashboard
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

const { t } = useI18n()

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
  75% {
    stroke: var(--user-item-color);
  }
}
</style>
