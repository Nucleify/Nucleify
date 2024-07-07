<template>
    <div class="mySidebar" v-if="shouldShowSidebar">
        <anchor-tag-molecule href="/home">
            <Image src="logo.png" width="50" />
        </anchor-tag-molecule>

        <div
            class="sidebarItems flex flex-column justify-content-center w-3rem m-0 gap-3"
        >
            <!-- Sidebar items -->
            <template v-for="item in items" :key="item.url">
                <anchor-tag-molecule
                    :href="item.url"
                    class="sidebarItem"
                    v-tooltip.right="item.label"
                    :style="getSidebarItemStyle(item.url!)"
                    :class="item.class"
                    :icon="item.icon"
                />
            </template>
        </div>

        <!-- User menu -->
        <div class="userMenu">
            <!-- User menu items -->
            <div class="userMenuItems">
                <template v-for="item in userMenuItems" :key="item.url">
                    <anchor-tag-molecule
                        v-if="item.label !== 'Logout'"
                        :href="item.url"
                        class="sidebarItem userMenuItem"
                        v-tooltip.right="item.label"
                        :class="item.class"
                        :icon="item.icon"
                    />
                    <anchor-tag-molecule
                        v-if="item.label === 'Logout'"
                        @click="logout"
                        class="sidebarItem userMenuItem"
                        v-tooltip.right="item.label"
                        :class="item.class"
                        :icon="item.icon"
                    />
                </template>
                <button-atom
                    unstyled
                    icon="pi pi-times"
                    class="sidebarItem userMenuItem closeUserMenuItem"
                    @click="closeUserMenu()"
                />
            </div>

            <avatar-atom
                class="sidebarUser"
                icon="pi pi-user"
                shape="circle"
                @click="openUserMenu()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { excludedPaths } from '@/constants'
import { isCurrentUrl, logout, useSidebar, useUserMenu } from '@/utils'

defineProps<{
    items: MenuItem[]
    userMenuItems: MenuItem[]
}>()

const shouldShowSidebar = ref(true)
const { getSidebarItemStyle } = useSidebar()
const { openUserMenu, closeUserMenu } = useUserMenu()

onMounted(() => {
    if (excludedPaths.some((path) => isCurrentUrl(path))) {
        shouldShowSidebar.value = false
    }
})
</script>
