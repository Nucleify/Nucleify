<template>
    <Sidebar v-model:visible="visible" header="ContactBook">
        <div class="flex flex-column h-full">
            <PanelMenu :model="items" />
            <div class="mt-auto">
                <hr class="mb-3 mx-2 border-top-1" />
                <a class="ml-5">
                    <span class="font-bold">Szymon Radoąmski</span>
                </a>
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

const visible = ref(false)

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/home',
    },
    {
        label: 'Messages',
        icon: 'pi pi-envelope',
    },
    {
        label: 'Activity Log',
        icon: 'pi pi-clock',
    },
    {
        label: 'Admin Panel',
        icon: 'pi pi-users',
        url: '/admin',
    },
])
</script>
