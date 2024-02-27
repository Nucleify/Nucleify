<template>
    <Sidebar v-model:visible="visible" header="ContactBook">
        <div class="flex flex-column h-full">
            <PanelMenu :model="items" />
            <div class="flex flex-column mt-auto justify-content-center">
                <hr class="mx-2 border-top-1" />

                <div class="sidebarUser flex align-items-center gap-3 cursor-pointer p-2 border-round-xl" @click="openUserMenu">
                    <Avatar
                        icon="pi pi-user"
                        shape="circle"
                        class="w-2rem h-2rem"
                    />
                    <p class="font-bold text-lg vertical-align-middle m-0 w-8">{{ userName }}</p>
                </div>
                <Menu
                    ref="menu"
                    :model="userMenuItems"
                    :popup="true"
                />
            </div>
        </div>
    </Sidebar>
    <Button
        class="myBigButton toggleSidebarButton fixed"
        icon="pi pi-chevron-right"
        @click="visible = true"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {logout} from "../../utils/auth/handleLogout";

const visible = ref(false)
const userName = window.sessionStorage.getItem('user_name')

const menu = ref()

const userMenuItems = ref([
  {
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user'
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: logout
      }
    ]
  }
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
