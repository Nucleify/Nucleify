<template>
    <welcome-navbar></welcome-navbar>
    <div class="welcomeContainer">
        <start></start>
        <features></features>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Start from './Start.vue'
import Features from './Features.vue'

import { useColors, useDisplayCharts } from '@/utils'

const { setDefaultColors } = useColors()
const { setDefaultChartsDisplay } = useDisplayCharts()

onMounted(() => {
    setDefaultColors(true)
  setDefaultChartsDisplay()
})
</script>
