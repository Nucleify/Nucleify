<template>
    <Menubar :model="items" class="myNavbar" breakpoint="992px">
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


defineProps<{
    items: any[]
    userMenuItems: any[]
}>()

const menu = ref()

function openUserMenu(event: MouseEvent): void {
    menu.value.toggle(event)
}
</script>
