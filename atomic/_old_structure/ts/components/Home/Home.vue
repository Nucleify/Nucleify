<template>
    <home-navbar />
    <div class="home-container">
        <start />
        <features />
        <innovations />
        <why-us />
    </div>
    <home-footer />
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'

import HomeFooter from './HomeFooter.vue'
import HomeNavbar from './HomeNavbar.vue'
import Features from './Features/Features.vue'
import Innovations from './Innovations/Innovations.vue'
import Start from './Start.vue'
import WhyUs from './WhyUs.vue'

import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()

onBeforeMount(() => window.scrollTo(0, 0))
onMounted(() => {
    setDefaultColors(true)
})
</script>
