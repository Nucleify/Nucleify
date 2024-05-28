<template>
    <div class="mySidebar" v-if="shouldShowSidebar">
        <div
            class="sidebarItems flex flex-column justify-content-center w-3rem m-0 gap-3"
        >
            <!-- Sidebar items -->
            <template v-for="(item, index) in items">
                <a
                    v-if="shouldRenderSidebarItem(item.url)"
                    :key="index"
                    :href="item.url"
                    class="sidebarItem"
                    v-tooltip.right="item.label"
                    :style="getSidebarItemStyle(item.url)"
                >
                    <i :class="item.icon" />
                </a>
            </template>

            <!-- Disabled sidebar items -->
            <a
                href="#"
                class="sidebarItem disabledItem"
                v-tooltip.right="'Messages'"
            >
                <i class="pi pi-envelope" />
            </a>
            <a
                href="#"
                class="sidebarItem disabledItem"
                v-tooltip.right="'Tasks'"
            >
                <i class="pi pi-check-square" />
            </a>
            <a
                href="#"
                class="sidebarItem disabledItem"
                v-tooltip.right="'Calendar'"
            >
                <i class="pi pi pi-calendar" />
            </a>
            <a
                href="#"
                class="sidebarItem disabledItem"
                v-tooltip.right="'Money'"
            >
                <i class="pi pi pi-dollar" />
            </a>
        </div>

        <!-- User menu -->
        <div class="userMenu">
            <!-- User menu items -->
            <div class="userMenuItems">
                <a
                    href="#"
                    class="sidebarItem userMenuItem"
                    v-tooltip.right="'Profile'"
                >
                    <i class="pi pi-user" />
                </a>
                <a
                    href="/settings"
                    class="sidebarItem userMenuItem"
                    v-tooltip.right="'Settings'"
                >
                    <i class="pi pi-cog" />
                </a>
                <a
                    href="#"
                    class="sidebarItem userMenuItem"
                    v-tooltip.right="'Help'"
                >
                    <i class="pi pi-info-circle" />
                </a>

                <a
                    href="#"
                    class="sidebarItem userMenuItem closeUserMenuItem"
                    @click="closeUserMenu()"
                >
                    <i class="pi pi-times" />
                </a>
            </div>

            <Avatar
                class="sidebarUser userAvatar"
                icon="pi pi-user"
                shape="circle"
                @click="openUserMenu()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, UnwrapRef } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { excludedPaths, handleStyles } from '@/constants'
import { isCurrentUrl, useSidebar, useUserMenu } from '@/utils'

defineProps<{
    items: Ref<UnwrapRef<MenuItem>>
    userMenuItems: MenuItem[]
}>()

const shouldShowSidebar = ref(true)
const { shouldRenderSidebarItem, getSidebarItemStyle } = useSidebar()
const { openUserMenu, closeUserMenu } = useUserMenu()

onMounted(() => {
    if (excludedPaths.some((path) => isCurrentUrl(path))) {
        shouldShowSidebar.value = false
    }
})

const { mainSidebarItemStyle } = handleStyles()
</script>
