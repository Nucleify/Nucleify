<template>
    <ad-card class="settings-card settings-small-card">
        <template #header>
            <div class="settings-card-header-container">
                <ad-header :tag="4" text="Colors" />

                <ad-button
                    icon="pi pi-refresh"
                    type="main"
                    class="refreshButton"
                    @click="setDefaultColors(false)"
                    rounded
                    text
                />
            </div>
            <hr />
        </template>
        <template #content>
            <ul class="settings-card-item-list">
                <li
                    v-for="item in colorList"
                    :key="item"
                    class="settings-card-item"
                >
                    <ad-label :label="item" :for="item" />
                    <ad-color-picker :item="item.toLowerCase()" />
                </li>
            </ul>
        </template>
    </ad-card>
</template>

<script setup lang="ts">
import { colorList } from 'atomic/bosons/constants'
import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()
</script>
