<template>
    <div class="fixed flex-column h-screen p-3 mySidebar">
        <a href="/" class="mt-2 mb-4 mx-auto">
            <Avatar
                image="https://gravatar.com/userimage/238510040/957772438776e8ef52497073f56790ea.jpeg?size=256"
                class="w-2rem h-2rem"
            />
        </a>

        <div class="flex flex-column justify-content-center w-3rem m-0 gap-3">
            <a
                href="/home"
                :class="{ active: isCurrentUrl('/home') }"
                class="sidebarItem text-center"
                v-tooltip.left="'Home'"
            >
                <i class="pi pi-home text-xl"></i>
            </a>
            <a
                href="#"
                :class="{ active: isCurrentUrl('/messages') }"
                class="sidebarItem text-center"
                v-tooltip.left="'Messages'"
            >
                <i class="pi pi-envelope text-xl"></i>
            </a>
            <a
                href="#"
                :class="{ active: isCurrentUrl('/todo') }"
                class="sidebarItem text-center"
                v-tooltip.left="'Tasks'"
            >
                <i class="pi pi-check-square text-xl"></i>
            </a>
            <a
                href="#"
                :class="{ active: isCurrentUrl('/export') }"
                class="sidebarItem text-center"
                v-tooltip.left="'Export Data'"
            >
                <i class="pi pi-file text-xl"></i>
            </a>
            <a
                href="/activity-log"
                :class="{ active: isCurrentUrl('/activity-log') }"
                class="sidebarItem text-center"
                v-tooltip.left="'Activity Log'"
            >
                <i class="pi pi-clock text-xl"></i>
            </a>
            <a
                href="/admin"
                :class="{ active: isCurrentUrl('/admin') && isAdmin }"
                class="sidebarItem text-center"
                v-if="isAdmin"
                v-tooltip.left="'Admin Panel'"
            >
                <i class="pi pi-users text-xl"></i>
            </a>
        </div>
        <div class="flex flex-column mt-auto justify-content-center">
            <div class="flex flex-column gap-3">
                <a
                    href="#"
                    :class="{ active: isCurrentUrl('/help') }"
                    class="sidebarItem text-center"
                    v-tooltip.left="'Help'"
                >
                    <i class="pi pi-info-circle text-xl"></i>
                </a>
                <a
                    href="#"
                    :class="{ active: isCurrentUrl('/settings') }"
                    class="sidebarItem text-center"
                    v-tooltip.left="'Settings'"
                >
                    <i class="pi pi-cog text-xl"></i>
                </a>
            </div>
            <hr class="border-top-1" />

            <div
                class="sidebarUser flex align-items-center gap-3 cursor-pointer p-2 border-round-xl"
                @click="openUserMenu"
            >
                <Avatar
                    icon="pi pi-user"
                    shape="circle"
                    class="w-2rem h-2rem"
                />
            </div>
            <Menu ref="menu" :model="userMenuItems" :popup="true" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue'

const menu = ref()

defineProps<{
    isAdmin: Ref | null
    items: any[]
    userMenuItems: any[]
    userName: string | null
}>()

function openUserMenu(event: MouseEvent): void {
    menu.value.toggle(event)
}

function isCurrentUrl(url: string): boolean {
    return window.location.pathname.includes(url)
}
</script>

<style scoped>
.active {
    color: #1bbd79;
    background: hsl(156, 100%, 97%);
}
.sidebarItem:hover {
    background: hsl(156, 100%, 94.5%);
}
</style>
