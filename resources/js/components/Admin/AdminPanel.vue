<template>
    <div class="panelContainer">
        <chart-box :userData="users" :contactData="contacts" />
        <user-dashboard
            :data="users"
            :getData="getAllUsers"
            :roleOptions="roleOptions"
        />
        <contact-dashboard
            :data="contacts"
            :getData="getAllContacts"
            :roleOptions="roleOptions"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { ChartBox } from '../'
import ContactDashboard from './Contact/ContactDashboard.vue'
import UserDashboard from './User/UserDashboard.vue'

import { contactApiMethods, userApiMethods } from '../../utils'

const { results: users, getAllUsers } = userApiMethods()
const { results: contacts, getAllContacts } = contactApiMethods()

onMounted(() => {
    getAllUsers()
    getAllContacts()
})

const roleOptions = ['user', 'tech', 'test_admin', 'admin', 'super_admin']
</script>
