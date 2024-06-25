<template>
    <Toast position="top-right" />
    <div class="layoutContainer">
        <my-navbar :items="layoutItems" :user-menu-items="userMenuItems" />

        <my-sidebar :items="layoutItems" :user-menu-items="userMenuItems" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import MyNavbar from './MyNavbar.vue'
import MySidebar from './MySidebar.vue'

import { useIsAdmin } from '@/utils'
import { layoutItems, userMenuItems } from '@/constants'

let isAdmin = ref(false)

onMounted(async () => {
    const { isAdmin: isAdminStatus } = await useIsAdmin()

    // eslint-disable-next-line
    isAdmin = isAdminStatus

    if (isAdmin.value) {
        layoutItems.value.splice(1, 0, {
            label: 'Admin Panel',
            icon: 'pi pi-users',
            url: '/admin',
        })
    }
})
</script>
