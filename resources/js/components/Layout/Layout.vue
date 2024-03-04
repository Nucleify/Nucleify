<template>
    <Toast position="top-right" />
    <div class="flex">
        <my-navbar :items="items" :user-menu-items="userMenuItems" />

        <my-sidebar
            :isAdmin="isAdmin"
            :items="items"
            :user-menu-items="userMenuItems"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import MyNavbar from './MyNavbar.vue'
import MySidebar from './MySidebar.vue'

import {
    fetchUser,
    logout,
    setUserToSessionStorage,
    useApiErrorsService
} from '../../utils'
import { IsAdminType } from '../../interfaces'


const { apiErrors } = useApiErrorsService()

const isAdmin: IsAdminType = ref(null)

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/home',
    },
    {
        label: 'Messages',
        icon: 'pi pi-envelope',
    },
    {
        label: 'Tasks',
        icon: 'pi pi-check-square',
    },
    {
        label: 'Export Data',
        icon: 'pi pi-file',
    },
    {
        label: 'Activity Log',
        icon: 'pi pi-clock',
        url: '/activity-log',
    },
    {
        label: 'Help',
        icon: 'pi pi-info-circle',
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
    },
])

const userMenuItems = ref([
    {
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-user',
            },
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: logout,
            },
        ],
    },
])
onMounted(() => {
    const user_id = window.sessionStorage.getItem('user_id')
    const userRole = window.sessionStorage.getItem('user_role') ?? ''

    switch (!user_id) {
        case true:
            fetchUser()
                .then((user) => {
                    if (user) {
                        setUserToSessionStorage(user)
                        if (
                            ['admin', 'test_admin', 'super_admin'].includes(
                                userRole
                            )
                        ) {
                            isAdmin.value = true
                            items.value.splice(5, 0, {
                                label: 'Admin Panel',
                                icon: 'pi pi-users',
                                url: '/admin',
                            })
                        }
                    }
                })
                .catch((error) => {
                    apiErrors(error)
                })
            break
        default:
            if (['admin', 'test_admin', 'super_admin'].includes(userRole)) {
                isAdmin.value = true
                items.value.splice(5, 0, {
                    label: 'Admin Panel',
                    icon: 'pi pi-users',
                    url: '/admin',
                })
            }
            break
    }
})
</script>
