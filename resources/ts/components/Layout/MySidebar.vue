<template>
    <div class="mySidebar" v-if="shouldShowSidebar">
        <a href="/welcome">
            <Image src="logo.png" width="50" />
        </a>

        <div
            class="sidebarItems flex flex-column justify-content-center w-3rem m-0 gap-3"
        >
            <!-- Sidebar items -->
            <template v-for="item in items">
                <a
                    :href="item.url"
                    class="sidebarItem"
                    v-tooltip.right="item.label"
                    :style="getSidebarItemStyle(item.url!)"
                    :class="item.class"
                >
                    <i :class="item.icon" />
                </a>
            </template>
        </div>

        <!-- User menu -->
        <div class="userMenu">
            <!-- User menu items -->
            <div class="userMenuItems">
                <template v-for="item in userMenuItems">
                    <a
                        v-if="item.label !== 'Logout'"
                        :href="item.url"
                        class="sidebarItem userMenuItem"
                        v-tooltip.right="item.label"
                        :class="item.class"
                    >
                        <i :class="item.icon" />
                    </a>
                    <a
                        v-if="item.label === 'Logout'"
                        class="sidebarItem userMenuItem"
                        :class="item.class"
                        v-tooltip.right="item.label"
                        @click="logout"
                    >
                        <i :class="item.icon" />
                    </a>
                </template>
                <Button
                    unstyled
                    class="sidebarItem userMenuItem closeUserMenuItem"
                    @click="closeUserMenu()"
                >
                    <i class="pi pi-times" />
                </Button>
            </div>

            <Avatar
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
