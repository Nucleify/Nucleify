<template>
    <Dock :model="dockItems" :position="position" class="dock">
        <template #icon="{ item }">
            <image-atom
                v-if="item.img"
                :src="item.img"
                :class="item.class"
                :alt="item.alt"
                width="35"
            />
            <item-molecule
                v-if="item.icon"
                :icon="item.icon"
                class="item plasmaItem"
                @click="item.click"
                :url="item.url"
                :style="getItemStyles(item.url, true)"
            />
            <div class="dockPositionButtons" v-if="item.id === 'position'">
                <radio-button-atom
                    v-for="pos of positions"
                    v-model="position"
                    :key="pos.value"
                    :value="pos.value"
                    :class="pos.value"
                    class="flex"
                    unstyled
                />
            </div>
        </template>
    </Dock>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useIsAdmin } from '@/utils'

import { dockItems, positions } from 'atomic/bosons/constants'
import { useItemStyles } from 'atomic/bosons/utils'

const { getItemStyles } = useItemStyles()

const position = ref('bottom')
let isAdmin = ref(false)

onMounted(async () => {
    const { isAdmin: isAdminStatus } = await useIsAdmin()

    // eslint-disable-next-line
    isAdmin = isAdminStatus

    if (isAdmin.value) {
        dockItems.value.splice(1, 0, {
            label: 'Admin Panel',
            icon: 'pi pi-user-edit',
            url: '/admin',
        })
    }
})
</script>
