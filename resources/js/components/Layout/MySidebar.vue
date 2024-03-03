<template>
    <div class="fixed flex-column h-screen p-3 mySidebar">
        <PanelMenu :model="items" class="w-3rem m-0 text-3xl" />
        <div class="flex flex-column mt-auto justify-content-center">
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
import { ref } from 'vue'

const menu = ref()

defineProps<{
    items: any[]
    userMenuItems: any[]
    userName: string | null
}>()

function openUserMenu(event: MouseEvent): void {
    menu.value.toggle(event)
}
</script>
