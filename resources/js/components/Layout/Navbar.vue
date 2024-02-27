<template>
    <Menubar :model="items" class="myNavbar">
        <template #end>
            <Avatar
                icon="pi pi-user"
                shape="circle"
                class="w-3rem h-3rem cursor-pointer"
                @click="openUserMenu($event)"
            />
            <Menu ref="menu" :model="userMenuItems" :popup="true" />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { logout } from '../../utils'

const menu = ref()
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

function openUserMenu(event: MouseEvent): void {
    menu.value.toggle(event)
}

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
    },
    {
        label: 'Admin Panel',
        icon: 'pi pi-users',
        url: '/admin',
    },
])
</script>
