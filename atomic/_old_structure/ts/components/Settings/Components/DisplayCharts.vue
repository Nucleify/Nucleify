<template>
    <ad-card class="settings-card settings-small-card">
        <template #header>
            <div class="settings-card-header-container">
                <ad-header :tag="4" text="Charts" />

                <ad-button
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
            <ul class="settings-card-item-list">
                <li
                    class="settings-card-item"
                    v-for="item in displayChartList"
                    :key="item"
                >
                    <ad-label :label="item" :for="item" />

                    <ad-radio-button
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
    </ad-card>
</template>

<script setup lang="ts">
import { displayChartList } from 'atomic/bosons/constants'
import { useDisplayCharts } from 'atomic/bosons/utils'

const { display, setDefaultChartsDisplay, displayChartsToggle } =
    useDisplayCharts()
</script>
