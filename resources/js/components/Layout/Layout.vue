<template>
    <my-sidebar
        :items="items"
        :user-menu-items="userMenuItems"
        :user-name="userName"
    />
    <my-navbar
        :items="items"
        :user-menu-items="userMenuItems"
        :user-name="userName"
    />

</template>

<script setup lang="ts">
import MyNavbar from './MyNavbar.vue'
import MySidebar from './MySidebar.vue'
import { onMounted, ref } from 'vue'
import { fetchUser, logout, setUserToSessionStorage } from '../../utils'

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
        label: 'Activity Log',
        icon: 'pi pi-clock',
        url: '/activity-log',
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

const userName = ref<string | null>(null)

onMounted(async () => {
    try {
        const user_id = window.sessionStorage.getItem('user_id')
        if (!user_id) {
            const user = await fetchUser()
            if (user) {
                setUserToSessionStorage(user)
                userName.value = window.sessionStorage.getItem('user_name')
                const userRole = window.sessionStorage.getItem('user_role')
                if (
                    userRole === 'admin' ||
                    userRole === 'test_admin' ||
                    userRole === 'super_admin'
                ) {
                    items.value.push({
                        label: 'Admin Panel',
                        icon: 'pi pi-users',
                        url: '/admin',
                    })
                }
            }
        } else {
            userName.value = window.sessionStorage.getItem('user_name')
            const userRole = window.sessionStorage.getItem('user_role')
            if  (
                userRole === 'admin' ||
                userRole === 'test_admin' ||
                userRole === 'super_admin'
            ) {
                items.value.push({
                    label: 'Admin Panel',
                    icon: 'pi pi-users',
                    url: '/admin',
                })
            }
        }
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
})
</script>
