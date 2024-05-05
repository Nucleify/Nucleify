<template>
    <Card class="myCard lg:ml-2 p-3 xl:px-4 md:col-6 xl:col-4 md:max-w-30rem">
        <template #header>
            <div class="flex justify-content-between">
                <h2>Item Colors</h2>
                <Button
                    class="myButton activityMyButton"
                    icon="pi pi-refresh"
                    @click="setDefaultColors(false)"
                    :style="mainStyle"
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul class="px-3 flex flex-column gap-3">
                <li
                    v-for="item in colorList"
                    :key="item"
                    class="flex justify-content-between"
                >
                    <h3>{{ item }}</h3>
                    <my-color-picker :item="getLowerCase(item)" />
                </li>
            </ul>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { colorList, handleStyles } from '@/constants'
import { getLowerCase, useColors } from '@/utils'

const { mainStyle } = handleStyles()
const { setDefaultColors } = useColors()
</script>

<style scoped>
:deep(.p-card-body) {
    padding: 0;
}
</style>
