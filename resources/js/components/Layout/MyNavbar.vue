<template>
    <Menubar :model="items" class="myNavbar" breakpoint="992px">
        <template #end>
            <Avatar
                icon="pi pi-user"
                shape="circle"
                class="w-2rem h-2rem cursor-pointer m-1"
                @click="openMenu(menu, $event)"
            />
            <Menu ref="menu" :model="userMenuItems" :popup="true" />
        </template>
    </Menubar>
</template>

<script setup lang="ts">
import { Ref, ref, UnwrapRef } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { openMenu } from '@/utils'

defineProps<{
    items: Ref<UnwrapRef<MenuItem>>
    userMenuItems: Ref<UnwrapRef<MenuItem>>
}>()

const menu = ref()
</script>
