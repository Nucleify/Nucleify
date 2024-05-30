<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <div class="panelContainer">
        <div
            class="adminBricks grid mx-auto col-12 justify-content-center flex my-4 lg:-my-2"
        >
            <div class="grid-item-container col-12 sm:col-6 lg:col-4">
                <a href="#articles" class="grid-item h-16rem">
                    <div class="adminBricksCircle" :style="articleCircleStyle">
                        <div>
                            <p class="adminBricksCircleNumber">
                                {{ articles?.length }}
                            </p>
                            <i class="pi pi-comment adminBricksIcon" />
                        </div>
                    </div>
                    <p
                        class="articlesBricksText"
                        :style="articleBricksTextStyle"
                    >
                        Articles
                    </p>
                </a>
            </div>
            <div class="grid-item-container col-12 sm:col-6 lg:col-4">
                <a href="#contacts" class="grid-item h-16rem">
                    <div class="adminBricksCircle" :style="contactCircleStyle">
                        <div>
                            <p class="adminBricksCircleNumber">
                                {{ contacts?.length }}
                            </p>
                            <i class="pi pi-users adminBricksIcon" />
                        </div>
                    </div>
                    <p
                        class="contactsBricksText"
                        :style="contactBricksTextStyle"
                    >
                        Contacts
                    </p>
                </a>
            </div>
            <div class="grid-item-container col-12 sm:col-6 lg:col-4">
                <a href="#users" class="grid-item h-16rem">
                    <div class="adminBricksCircle" :style="userCircleStyle">
                        <div>
                            <p class="adminBricksCircleNumber">
                                {{ users?.length }}
                            </p>
                            <i class="pi pi-users adminBricksIcon" />
                        </div>
                    </div>
                    <p class="usersBricksText" :style="userBricksTextStyle">
                        Users
                    </p>
                </a>
            </div>

            <div
                v-if="display.Admin"
                class="grid-item-container chartCard countChartCard col-12 sm:col-6 lg:col-4"
            >
                <div class="grid-item h-16rem">
                    <my-chart
                        :chart-method-type="'count'"
                        :type="'pie'"
                        :article-data="articles"
                        :contactData="contacts"
                        :userData="users"
                        :chart-class="'h-16 w-16 -mt-2'"
                        :class="!allLoaded ? 'chartLoading' : 'chartLoaded'"
                    />
                    <ProgressSpinner
                        v-if="!allLoaded"
                        :style="{ color: 'blue' }"
                    />
                </div>
            </div>
        </div>

        <Card
            v-if="display.Admin"
            class="myCard chartCard annualChartCard lg:ml-2 lg:mr-5 lg:px-3 xl:px-4 xl:pb-4"
        >
            <template #content>
                <my-chart
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :direction="'vertical'"
                    :article-data="articles"
                    :contactData="contacts"
                    :userData="users"
                    :chart-class="'myChart h-30rem'"
                    :class="!allLoaded ? 'chartLoading' : 'chartLoaded'"
                />
                <ProgressSpinner v-if="!allLoaded" />
            </template>
        </Card>

        <article-dashboard
            :data="articles"
            :getData="getAllArticles"
            :loading="articlesLoading"
        />
        <contact-dashboard
            :data="contacts"
            :getData="getAllContacts"
            :loading="contactsLoading"
        />
        <user-dashboard
            :data="users"
            :getData="getAllUsers"
            :loading="usersLoading"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'

import { MyChart } from '@/components'
import ArticleDashboard from './Article/ArticleDashboard.vue'
import ContactDashboard from './Contact/ContactDashboard.vue'
import UserDashboard from './User/UserDashboard.vue'

import {
    articleApiMethods,
    contactApiMethods,
    useColors,
    useDisplayCharts,
    userApiMethods,
} from '@/utils'

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
    getAllArticles(500)
    getAllContacts(500)
    getAllUsers(500)
})

const { articleItemColors, contactItemColors, userItemColors } = useColors()

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

const articleCircleStyle = {
    background: articleItemColors.primary,
}
const articleBricksTextStyle = {
    color: articleItemColors.primary,
}
const contactCircleStyle = {
    background: contactItemColors.primary,
}
const contactBricksTextStyle = {
    color: contactItemColors.primary,
}
const userCircleStyle = {
    background: userItemColors.primary,
}
const userBricksTextStyle = {
    color: userItemColors.primary,
}
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
