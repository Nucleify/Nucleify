<template>
    <Menubar :model="items" class="myNavbar" breakpoint="992px">
        <template #end>
            <avatar-atom
                icon="pi pi-user"
                shape="circle"
                class="navbarUser"
                @click="openMenu(menu, $event)"
            />
            <Menu ref="menu" :model="userMenuItems" :popup="true" />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { openMenu } from '@/utils'

defineProps<{
    items: MenuItem[]
    userMenuItems: MenuItem[]
}>()

const menu = ref()
</script>
