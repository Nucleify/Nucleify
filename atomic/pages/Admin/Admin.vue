<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <div class="panel-container">
    <div class="admin-tiles grid col-12">
      <ad-tile
        href="#articles"
        header="Articles"
        :count="articles?.length"
        icon="pi pi-comment"
        count-secondary="20 new"
        text-secondary="this week"
        ad-type="article"
      />
      <ad-tile
        href="#contacts"
        header="Contacts"
        :count="contacts?.length"
        icon="pi pi-user"
        count-secondary="20 new"
        text-secondary="this week"
        ad-type="contact"
      />
      <ad-tile
        href="#money"
        header="Money"
        :count="money?.length"
        icon="pi pi-user"
        count-secondary="20 new"
        text-secondary="this week"
        type="money"
      />
      <ad-tile
        href="#users"
        header="Users"
        :count="users?.length"
        icon="pi pi-user"
        count-secondary="20 new"
        text-secondary="this week"
        ad-type="user"
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
    <user-dashboard
      :data="users"
      :getData="getAllUsers"
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
  UserDashboard,
} from './'

import {
  articleRequests,
  contactRequests,
  userRequests,
  useDisplayCharts,
  moneyRequests,
} from 'atomic/bosons/utils'

const { display } = useDisplayCharts()

const {
  results: articles,
  loading: articlesLoading,
  getAllArticles,
} = articleRequests()
const {
  results: contacts,
  loading: contactsLoading,
  getAllContacts,
} = contactRequests()
const { results: money, loading: moneyLoading, getAllMoney } = moneyRequests()
const { results: users, loading: usersLoading, getAllUsers } = userRequests()

onMounted(() => {
  getAllArticles(true)
  getAllContacts(true)
  getAllMoney(true)
  getAllUsers(true)
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
