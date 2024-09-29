<template>
    <Card
        class="settings-card settings-small-card"
    >
        <template #header>
            <div class="settings-card-header-container">
                <heading-atom :tag="4" text="Charts" />

                <button-atom
                    icon="pi pi-refresh"
                    type="main"
                    class="refreshButton"
                    @click="setDefaultChartsDisplay(false, true)"
                    rounded
                    text
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul
                class="settings-card-item-list"
            >
                <li
                    class="settings-card-item"
                    v-for="item in displayChartList"
                    :key="item"
                >
                    <label-atom :label="item" :for="item" />

                    <radio-button-atom
                        :input-id="item"
                        :value="item"
                        type="main"
                        @click="displayChartsToggle(item)"
                        :class="display[item] ? 'p-highlight' : ''"
                        class="p-radiobutton-main"
                    />
                </li>
            </ul>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { displayChartList } from '@/constants'
import { useDisplayCharts } from 'atomic/bosons/utils'

const { display, setDefaultChartsDisplay, displayChartsToggle } =
    useDisplayCharts()
</script>
