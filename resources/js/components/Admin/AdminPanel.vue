<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <div class="panelContainer">
        <div
            class="adminBricks grid mx-auto col-12 justify-content-center flex my-4 lg:-my-2"
        >
            <div class="col-12 sm:col-6 lg:col-4 grid-item-container">
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
            <div class="col-12 sm:col-6 lg:col-4 grid-item-container">
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
            <div class="col-12 sm:col-6 lg:col-4 grid-item-container">
                <a href="#" class="grid-item h-16rem p-5">
                    <my-chart
                        :chart-method-type="'count'"
                        :type="'pie'"
                        :userData="users"
                        :contactData="contacts"
                        :chart-class="'h-16 w-16 -mt-4'"
                    />
                </a>
            </div>
        </div>

        <Card class="myCard lg:ml-2 lg:mr-5 lg:px-3 xl:px-4 xl:pb-4 xl:pt-2">
            <template #content>
                <my-chart
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :userData="users"
                    :contactData="contacts"
                    :chart-class="'h-30rem'"
                />
            </template>
        </Card>

        <contact-dashboard :data="contacts" :getData="getAllContacts" />
        <user-dashboard :data="users" :getData="getAllUsers" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { MyChart } from '@/components'
import ContactDashboard from './Contact/ContactDashboard.vue'
import UserDashboard from './User/UserDashboard.vue'

import { contactApiMethods, useColors, userApiMethods } from '@/utils'

const { results: users, getAllUsers } = userApiMethods()
const { results: contacts, getAllContacts } = contactApiMethods()

onMounted(() => {
    getAllUsers()
    getAllContacts()
})

const { contactItemColors, userItemColors } = useColors()

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
