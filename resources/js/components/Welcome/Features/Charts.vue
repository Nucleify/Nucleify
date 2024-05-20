<template>
    <div class="welcomeChartsContainer">
        <h5 class="welcomeChartsHeader">Choose from bar charts, line graphs, pie charts and more to best represent your data.</h5>
        <Card
            unstyled
            class="myCard welcomeChartCard lg:px-2 xl:px-4"
        >
            <template #content>
                <my-chart
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :article-data="articles"
                    :contactData="contacts"
                    :userData="users"
                    :chart-class="'welcomeHorizontalChart'"
                    :direction="'horizontal'"
                    :example="true"
                />
                <my-chart
                    :chart-method-type="'count'"
                    :type="'pie'"
                    :article-data="articles"
                    :contactData="contacts"
                    :userData="users"
                    :chart-class="'welcomePieChart -mt-2'"
                    :example="true"
                />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { MyChart } from '@/components'
import { articleApiMethods, contactApiMethods, userApiMethods } from '@/utils'
import { onMounted } from 'vue'

const { results: articles, getAllArticles } = articleApiMethods()
const { results: contacts, getAllContacts } = contactApiMethods()
const { results: users, getAllUsers } = userApiMethods()

onMounted(() => {
    getAllArticles()
    getAllContacts()
    getAllUsers()
})
</script>
