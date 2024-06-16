<template>
    <Card
        class="myCard settingsCard settingsSmallCard col-12 sm:col-6 xl:col-4"
    >
        <template #header>
            <div class="myCardHeaderContainer">
                <h2>Display Charts</h2>
                <Button
                    class="myButton p-button-rounded"
                    icon="pi pi-refresh"
                    @click="setDefaultChartsDisplay(true)"
                    :style="mainStyle"
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul
                class="settingsCardItemList"
                v-for="item in displayChartList"
                :key="item"
            >
                <li class="settingsCardItem">
                    <h3>{{ item }}</h3>
                    <Button
                        class="myButton p-button-rounded"
                        :icon="display[item] ? 'pi pi-eye' : 'pi pi-eye-slash'"
                        :style="mainStyle"
                        @click="displayChartsToggle(item)"
                    />
                </li>
            </ul>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { displayChartList, handleStyles } from '@/constants'
import { useDisplayCharts } from '@/utils'

const { mainStyle } = handleStyles()
const { display, setDefaultChartsDisplay, displayChartsToggle } =
    useDisplayCharts()
</script>

<style scoped>
:deep(.p-card-body) {
    padding: 0;
}
</style>
