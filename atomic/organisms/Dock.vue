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
            <item-atom
                v-if="item.icon || item.url"
                :icon="item.icon"
                class="item plasmaItem"
                @click="item.click"
                :url="item.url"
                :style="getItemStyles(item.url!, true)"
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

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue'

import { useIsAdmin } from '@/utils'
import { dockItems, positions } from 'atomic/bosons/constants'
import { PositionType } from 'atomic/bosons/types'
import { setColorsVariables, useItemStyles } from 'atomic/bosons/utils'

const { getItemStyles } = useItemStyles()

const LOCAL_STORAGE_KEY = 'dockPosition'

const position = ref<PositionType>('bottom')
let isAdmin: Ref<boolean> = ref(false)

function setDockPositionForScreenSize() {
    if (window.innerWidth == 992) {
        position.value = 'bottom'
    }
}

onMounted(async () => {
    setColorsVariables()

    const savedPosition = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedPosition) {
        position.value = savedPosition as PositionType
    }

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

    window.addEventListener('resize', setDockPositionForScreenSize)
})

watch(position, (newPosition) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, newPosition)
})
</script>
