<template>
    <div class="panelContainer">
        <Card
            class="myCard lg:ml-2 p-3 xl:px-4 md:col-6 xl:col-4 md:max-w-30rem"
        >
            <template #header>
                <h2>Item Colors</h2>
                <hr />
            </template>
            <template #content>
                <ul class="px-3 flex flex-column gap-3">
                    <li
                        v-for="item in items"
                        :key="item"
                        class="flex justify-content-between"
                    >
                        <h3>{{ item }}</h3>
                        <my-color-picker :item="getLowercase(item)" />
                    </li>
                </ul>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref<string[]>(['Main', 'Activity', 'Contact', 'User'])

const getLowercase = (item: string) => item.toLowerCase()
</script>

<style scoped>
:deep(.p-card-body) {
    padding: 0;
}
</style>
