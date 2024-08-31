<template>
    <section id="why-us">
        <div
            class="whyUsContainer px-4 py-8 md:px-6 lg:px-8 text-center flex justify-content-center align-items-center"
        >
            <div class="mb-3 font-bold text-3xl -mt-5 absolute whyUsHeader">
                <span>Why </span>
                <span class="text-green-600">Us?</span>
            </div>

            <div
                v-for="(group, groupIndex) in whyUsData"
                :key="groupIndex"
                :class="`whyUs${groupIndex} flex justify-content-between absolute`"
            >
                <item-atom
                    v-for="(item, itemIndex) in group.items"
                    :key="itemIndex"
                    :icon="item.icon"
                    class="whyUsItem"
                    @click="openDialog(item)"
                    v-tooltip="'Click me!'"
                />
            </div>
        </div>
    </section>
    <Dialog
        v-model:visible="dialogVisible"
        :data="dialogData"
        @close="dialogVisible = false"
        modal
        class="whyUsDialog m-4"
    >
        <template #header>
            <div class="flex align-items-center gap-4">
                <item-atom :icon="dialogData.icon" class="text-xl" />
                <heading-atom :tag="4" class="m-0" :text="dialogData.title" />
            </div>
        </template>
        <template #default>
            <paragraph-atom
                class="m-0 text-sm"
                :text="dialogData.description"
            />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { whyUsData } from '@/constants'

const dialogVisible = ref(false)
const dialogData = ref()

const openDialog = (item) => {
    dialogData.value = {
        title: item.title,
        description: item.description,
        icon: item.icon,
    }
    dialogVisible.value = true
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

const handleClickOutside = (event: MouseEvent) => {
    const element = document.querySelector('.whyUsContainer')
    if (element && !element.contains(event.target as Node)) {
        dialogVisible.value = false
    }
}
</script>
