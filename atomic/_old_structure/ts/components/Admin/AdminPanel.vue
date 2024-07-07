<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <div class="panelContainer">
        <div class="adminBricks grid col-12">
            <div class="grid-item-container col-6 lg:col-4">
                <anchor-molecule href="#articles" class="grid-item">
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
                </anchor-molecule>
            </div>
            <div class="grid-item-container col-6 lg:col-4">
                <anchor-molecule href="#contacts" class="grid-item">
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
                </anchor-molecule>
            </div>
            <div class="grid-item-container col-6 lg:col-4">
                <anchor-molecule href="#users" class="grid-item">
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
                </anchor-molecule>
            </div>

            <div
                v-if="display.Admin"
                class="grid-item-container chartCard countChartCard col-6 lg:col-4"
            >
                <div class="grid-item">
                    <my-chart
                        :chart-method-type="'count'"
                        :type="'pie'"
                        :article-data="articles"
                        :contactData="contacts"
                        :userData="users"
                        :chart-class="'h-8 w-8 -mt-2'"
                        :class="!allLoaded ? 'chartLoading' : 'chartLoaded'"
                    />
                    <progress-spinner-atom
                        v-if="!allLoaded"
                        :style="{ color: 'blue' }"
                    />
                </div>
            </div>
        </div>

        <Card v-if="display.Admin" class="myCard chartCard annualChartCard">
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
                <progress-spinner-atom v-if="!allLoaded" />
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
    useDisplayCharts,
    userApiMethods,
} from '@/utils'

import { useColors } from 'atomic/bosons/utils'
import { UseColorsReturnInterface } from 'atomic/bosons/types'

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

const {
    articleItemColors,
    contactItemColors,
    userItemColors,
}: UseColorsReturnInterface = useColors()

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
    background: articleItemColors.primary || undefined,
}
const articleBricksTextStyle = {
    color: articleItemColors.primary || undefined,
}
const contactCircleStyle = {
    background: contactItemColors.primary || undefined,
}
const contactBricksTextStyle = {
    color: contactItemColors.primary || undefined,
}
const userCircleStyle = {
    background: userItemColors.primary || undefined,
}
const userBricksTextStyle = {
    color: userItemColors.primary || undefined,
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
