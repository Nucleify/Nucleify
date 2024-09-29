<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <div class="panel-container">
        <div class="admin-bricks grid col-12">
            <tile-organism
                href="#articles"
                header="Articles"
                :count="articles.length"
                icon="pi pi-comment"
                count-secondary="20 new"
                text-secondary="this week"
                type="article"
            />
            <tile-organism
                href="#contacts"
                header="Contacts"
                :count="contacts.length"
                icon="pi pi-user"
                count-secondary="20 new"
                text-secondary="this week"
                type="contact"
            />
            <tile-organism
                href="#users"
                header="Users"
                :count="users.length"
                icon="pi pi-user"
                count-secondary="20 new"
                text-secondary="this week"
                type="user"
            />
        </div>

        <card-chart
            v-if="display.Admin"
            class="annual-chart-card"
            :chart-method-type="'annual'"
            :type="'bar'"
            :direction="'vertical'"
            :article-data="articles"
            :contact-data="contacts"
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
        <user-dashboard
            :data="users"
            :getData="getAllUsers"
            :loading="!allLoaded"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import ArticleDashboard from './ArticleDashboard.vue'
import ContactDashboard from './ContactDashboard.vue'
import UserDashboard from './UserDashboard.vue'

import { articleApiMethods, contactApiMethods, userApiMethods } from '@/utils'

import { useDisplayCharts } from 'atomic/bosons/utils'

const { display } = useDisplayCharts()

const {
    results: articles,
    loading: articlesLoading,
    getAllArticles,
} = articleApiMethods()
const {
    results: contacts,
    loading: contactsLoading,
    getAllContacts,
} = contactApiMethods()
const { results: users, loading: usersLoading, getAllUsers } = userApiMethods()

onMounted(() => {
    getAllArticles()
    getAllContacts()
    getAllUsers()
})

const allLoaded: Ref<boolean> = ref(false)

watch(
    [articlesLoading, contactsLoading, usersLoading],
    ([newArticlesLoading, newContactsLoading, newUsersLoading]) => {
        if (!newArticlesLoading && !newContactsLoading && !newUsersLoading) {
            setTimeout(() => {
                allLoaded.value = true
            }, 500)
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
        stroke: var(--contact-item-color);
    }
    40% {
        stroke: var(--article-item-color);
    }
    80% {
        stroke: var(--user-item-color);
    }
}
</style>
