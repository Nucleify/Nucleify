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

import { useColors, useDisplayGraphs } from '@/utils'

const { setDefaultColors } = useColors()
const { setDefaultGraphsDisplay } = useDisplayGraphs()

onMounted(() => {
    setDefaultColors()
    setDefaultGraphsDisplay()
})
</script>
