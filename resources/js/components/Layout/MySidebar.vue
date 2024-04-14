<template>
    <div
        class="fixed flex-column h-screen p-3 mySidebar z-100"
        v-if="shouldShowSidebar"
    >
        <div class="flex flex-column justify-content-center w-3rem m-0 gap-3">
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
                v-tooltip.right="'Posts'"
            >
                <i class="pi pi-comment" />
            </a>
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
        <div class="flex flex-column mt-auto justify-content-center">
            <div class="flex flex-column gap-3">
                <a
                    href="#"
                    class="sidebarItem disabledItem"
                    v-tooltip.right="'Help'"
                >
                    <i class="pi pi-info-circle" />
                </a>
                <a
                    href="/settings"
                    class="sidebarItem"
                    v-tooltip.right="'Settings'"
                    :style="
                        isCurrentUrl('/settings') ? mainSidebarItemStyle : ''
                    "
                >
                    <i class="pi pi-cog" />
                </a>
            </div>
            <hr class="border-top-1" />

            <div
                class="sidebarUser flex align-items-center gap-3 cursor-pointer p-2 border-round-xl"
                @click="openMenu($refs.menu, $event)"
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
import { ref, onMounted, Ref, UnwrapRef } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { excludedPaths, handleStyles } from '@/constants'
import { isCurrentUrl, openMenu, useSidebar } from '@/utils'

defineProps<{
    items: Ref<UnwrapRef<MenuItem>>
    userMenuItems: MenuItem[]
}>()

const shouldShowSidebar = ref(true)
const { shouldRenderSidebarItem, getSidebarItemStyle } = useSidebar()

onMounted(() => {
    if (excludedPaths.some((path) => isCurrentUrl(path))) {
        shouldShowSidebar.value = false
    }
})

const { mainSidebarItemStyle } = handleStyles()
</script>
