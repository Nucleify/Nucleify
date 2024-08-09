<template>
    <Card
        class="myCard settingsCard settingsSmallCard col-12 sm:col-6 xl:col-4"
    >
        <template #header>
            <div class="myCardHeaderContainer">
                <heading-atom :tag="2" text="Display Charts" />

                <button-atom
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
                    <heading-atom :tag="3" :text="item" />
                    <button-atom
                        class="myButton"
                        @click="displayChartsToggle(item)"
                        :icon="display[item] ? 'pi pi-eye' : 'pi pi-eye-slash'"
                        :rounded="true"
                        :style="mainStyle"
                    />
                </li>
            </ul>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { displayChartList } from '@/constants'

import { handleStyles } from 'atomic/bosons/constants'
import { useDisplayCharts } from 'atomic/bosons/utils'

const { mainStyle } = handleStyles()
const { display, setDefaultChartsDisplay, displayChartsToggle } =
    useDisplayCharts()
</script>
