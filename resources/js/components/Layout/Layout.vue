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
import { MenuItem } from 'primevue/menuitem'

import MyNavbar from './MyNavbar.vue'
import MySidebar from './MySidebar.vue'

import { IsAdminType } from '@/types'
import { userApiMethods, logout, setUserToSessionStorage } from '@/utils'

const { getUser } = userApiMethods()

const isAdmin: IsAdminType = ref(null)

const items = ref<MenuItem>([
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/home',
    },
    {
        label: 'Contacts',
        icon: 'pi pi-user',
        url: '/contacts',
    },
    {
        label: 'Posts',
        icon: 'pi pi-comment',
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
        label: 'Calendar',
        icon: 'pi pi-calendar',
    },
    {
        label: 'Money',
        icon: 'pi pi-dollar',
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
        url: '/settings',
    },
])

const userMenuItems = ref<MenuItem>([
    {
        items: [
            {
                label: 'Welcome',
                icon: 'pi pi-home',
                url: '/welcome',
            },
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

onMounted(async () => {
    const user_id = window.sessionStorage.getItem('user_id')
    let userRole = ''

    switch (!user_id) {
        case true:
            await getUser().then((user) => {
                if (user) {
                    setUserToSessionStorage(user)
                    userRole = window.sessionStorage.getItem('user_role') ?? ''
                    if (
                        userRole === 'admin' ||
                        userRole === 'test_admin' ||
                        userRole === 'super_admin'
                    ) {
                        isAdmin.value = true
                        items.value.splice(10, 0, {
                            label: 'Admin Panel',
                            icon: 'pi pi-users',
                            url: '/admin',
                        })
                    }
                }
            })
            break
        default:
            userRole = window.sessionStorage.getItem('user_role') ?? ''
            if (
                userRole === 'admin' ||
                userRole === 'test_admin' ||
                userRole === 'super_admin'
            ) {
                isAdmin.value = true
                items.value.splice(10, 0, {
                    label: 'Admin Panel',
                    icon: 'pi pi-users',
                    url: '/admin',
                })
            }
            break
    }
})
</script>
