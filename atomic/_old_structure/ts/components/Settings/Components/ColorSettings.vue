<template>
    <Card
        class="settings-card settings-small-card"
    >
        <template #header>
            <div class="settings-card-header-container">
                <heading-atom :tag="4" text="Colors" />

                <button-atom
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
                    <label-atom :label="item" :for="item" />
                    <color-picker-atom :item="getLowerCase(item)" />
                </li>
            </ul>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { colorList } from '@/constants'
import { getLowerCase } from '@/utils'

import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()
</script>
