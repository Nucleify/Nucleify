<template>
    <Sidebar v-model:visible="visible" header="ContactBook">
        <div class="flex flex-column h-full">
            <PanelMenu :model="items" />
            <div class="flex flex-column mt-auto justify-content-center">
                <hr class="mx-2 border-top-1" />

                <div
                    class="sidebarUser flex align-items-center gap-3 cursor-pointer p-2 border-round-xl"
                    @click="openUserMenu"
                >
                    <Avatar
                        icon="pi pi-user"
                        shape="circle"
                        class="w-2rem h-2rem"
                    />
                    <p class="font-bold text-lg vertical-align-middle m-0 w-8">
                        {{ userName || 'undefined' }}
                    </p>
                </div>
                <Menu ref="menu" :model="userMenuItems" :popup="true" />
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

const menu = ref()
const visible = ref(false)

defineProps<{
    items: any[]
    userMenuItems: any[]
    userName: string | null
}>()

function openUserMenu(event: MouseEvent): void {
    menu.value.toggle(event)
}
</script>
