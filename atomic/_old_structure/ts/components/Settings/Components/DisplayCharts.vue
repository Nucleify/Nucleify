<template>
    <Card
        class="settingsCard settingsSmallCard"
    >
        <template #header>
            <div class="settingsCardHeaderContainer">
                <heading-atom :tag="4" text="Charts" />

                <button-atom
                    icon="pi pi-refresh"
                    class="refreshButton"
                    @click="setDefaultChartsDisplay(true)"
                    rounded
                    text
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul
                class="settingsCardItemList"
            >
                <li
                    class="settingsCardItem"
                    v-for="item in displayChartList"
                    :key="item"
                >
                    <label-atom :label="item" :for="item" />

                    <radio-button-atom
                        v-model="display[item]"
                        :input-id="item"
                        :value="item"
                        @click="displayChartsToggle(item)"
                        :class="display[item] ? 'p-highlight' : ''"
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

const { mainItemStyle } = handleStyles()
const { display, setDefaultChartsDisplay, displayChartsToggle } =
    useDisplayCharts()
</script>
