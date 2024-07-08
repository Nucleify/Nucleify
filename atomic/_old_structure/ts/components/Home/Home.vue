<template>
    <home-navbar />
    <div class="homeContainer">
        <start />
        <features />
    </div>
    <home-footer v-if="isFooterVisible" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Features from './Features/Features.vue'
import Start from './Start.vue'
import HomeFooter from './HomeFooter.vue'
import HomeNavbar from './HomeNavbar.vue'

import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()

onMounted(() => {
    setDefaultColors(true)
    window.addEventListener('scroll', handleScroll)
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
