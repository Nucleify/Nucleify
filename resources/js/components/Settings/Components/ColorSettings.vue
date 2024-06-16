<template>
    <Card
        class="myCard settingsCard settingsSmallCard col-12 sm:col-6 xl:col-4"
    >
        <template #header>
            <div class="myCardHeaderContainer">
                <h2>Item Colors</h2>
                <Button
                    class="myButton"
                    icon="pi pi-refresh"
                    @click="setDefaultColors(false)"
                    :style="mainStyle"
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul class="settingsCardItemList">
                <li
                    v-for="item in colorList"
                    :key="item"
                    class="settingsCardItem"
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
