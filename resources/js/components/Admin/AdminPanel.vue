<template>
    <div class="adminPanel flex flex-column gap-1 lg:pb-1">
        <user-dashboard v-bind:roleOptions="roleOptions" />
        <contact-dashboard v-bind:roleOptions="roleOptions" />
    </div>
</template>

<script setup lang="ts">
import ContactDashboard from './Contact/ContactDashboard.vue'
import UserDashboard from './User/UserDashboard.vue'

const roleOptions = ['user', 'tech', 'test_admin', 'admin', 'super_admin']
</script>
