<template>
    <Card
        class="myCard settingsCard settingsSmallCard col-12 sm:col-6 xl:col-4"
    >
        <template #header>
            <div class="myCardHeaderContainer">
                <h2>Item Colors</h2>
                <button-atom
                    class="myButton"
                    @click="setDefaultColors(false)"
                    icon="pi pi-refresh"
                    :rounded="true"
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

const { mainStyle } = handleStyles()
const { setDefaultColors } = useColors()
</script>
