<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <div class="panelContainer">
        <div class="adminBricks grid col-12">
            <div class="grid-item-container col-6 lg:col-4">
                <anchor-molecule href="#articles" class="grid-item">
                    <div class="adminBricksCircle" :style="articleCircleStyle">
                        <div>
                            <paragraph-atom
                                class="adminBricksCircleNumber"
                                :text="articles?.length"
                            />
                            <i class="pi pi-comment adminBricksIcon" />
                        </div>
                    </div>
                    <paragraph-atom
                        class="articlesBricksText"
                        :style="articleBricksTextStyle"
                        text="Articles"
                    />
                </anchor-molecule>
            </div>
            <div class="grid-item-container col-6 lg:col-4">
                <anchor-molecule href="#contacts" class="grid-item">
                    <div class="adminBricksCircle" :style="contactCircleStyle">
                        <div>
                            <paragraph-atom
                                class="adminBricksCircleNumber"
                                :text="contacts?.length"
                            />
                            <i class="pi pi-users adminBricksIcon" />
                        </div>
                    </div>
                    <paragraph-atom
                        class="contactsBricksText"
                        :style="contactBricksTextStyle"
                        text="Contacts"
                    />
                </anchor-molecule>
            </div>
            <div class="grid-item-container col-6 lg:col-4">
                <anchor-molecule href="#users" class="grid-item">
                    <div class="adminBricksCircle" :style="userCircleStyle">
                        <div>
                            <paragraph-atom
                                class="adminBricksCircleNumber"
                                :text="users?.length"
                            />

                            <i class="pi pi-users adminBricksIcon" />
                        </div>
                    </div>
                    <paragraph-atom
                        class="usersBricksText"
                        :style="userBricksTextStyle"
                        text="Users"
                    />
                </anchor-molecule>
            </div>

            <div class="grid-item-container col-6 lg:col-4">
                <card-chart
                    v-if="display.Admin"
                    class="grid-item countChartCard"
                    :chart-method-type="'count'"
                    :type="'pie'"
                    :article-data="articles"
                    :contact-data="contacts"
                    :user-data="users"
                    :loading="!allLoaded"
                />
            </div>
        </div>

        <card-chart
            v-if="display.Admin"
            class="annualChartCard"
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

import ArticleDashboard from './ArticleDashboard.vue'
import ContactDashboard from './ContactDashboard.vue'
import UserDashboard from './UserDashboard.vue'

import { articleApiMethods, contactApiMethods, userApiMethods } from '@/utils'

import { UseColorsReturnInterface } from 'atomic/bosons/types'
import { useColors, useDisplayCharts } from 'atomic/bosons/utils'

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
