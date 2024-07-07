<template>
    <home-navbar></home-navbar>
    <div class="homeContainer">
        <start />
        <features />
        <home-footer />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Features from './Features/Features.vue'
import Start from './Start.vue'
import HomeFooter from './HomeFooter.vue'
import HomeNavbar from './HomeNavbar.vue'

import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()

onMounted(() => {
    setDefaultColors(true)
})
</script>
