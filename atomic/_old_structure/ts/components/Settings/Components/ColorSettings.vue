<template>
    <Card
        class="settingsCard settingsSmallCard"
    >
        <template #header>
            <div class="settingsCardHeaderContainer">
                <heading-atom :tag="4" text="Colors" />

                <button-atom
                    icon="pi pi-refresh"
                    class="refreshButton"
                    @click="setDefaultColors(false)"
                    rounded
                    text
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

import { handleStyles } from 'atomic/bosons/constants'
import { useColors } from 'atomic/bosons/utils'

const { mainItemStyle    } = handleStyles()
const { setDefaultColors } = useColors()
</script>
