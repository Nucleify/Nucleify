<template>
    <Menubar :model="items" class="myNavbar" breakpoint="992px">
        <template #end>
            <Avatar
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
import { Ref, ref } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { openMenu } from '@/utils'

defineProps<{
    items: Ref<MenuItem[]>
    userMenuItems: Ref<MenuItem[]>
}>()

const menu = ref()
</script>
