<template>
    <home-navbar />
    <div class="homeContainer">
        <start />
        <features />
        <why-us />
    </div>
    <home-footer v-if="isFooterVisible" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import HomeFooter from './HomeFooter.vue'
import HomeNavbar from './HomeNavbar.vue'
import Features from './Features/Features.vue'
import Start from './Start.vue'
import WhyUs from './WhyUs.vue'

import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()

onMounted(() => {
    setDefaultColors(true)
    window.addEventListener('scroll', handleScroll)

    setTimeout(() => {
        window.scrollTo(0, 0);
        window.location.href = '#start'
    }, 100)
})

const isFooterVisible = ref(true)

function handleScroll() {
    const scrollPosition = window.scrollY;

    if (window.innerWidth <= 992) {
        isFooterVisible.value = scrollPosition >= 2000;
    } else {
        isFooterVisible.value = scrollPosition >= 1500
    }
}
</script>
