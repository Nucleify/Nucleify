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

import { useColors, useViewportChange } from 'atomic/bosons/utils'

import { HomeFooter, HomeNavbar, Features, Innovations, Start, WhyUs } from './'

const { setDefaultColors } = useColors()

useViewportChange(
  [
    '#access div',
    '#structure div',
    '#technologies div',
    '#why-us div',
    '#footer div',
  ],
  100
)

useViewportChange(['.home-chart-card div[data-pc-section="body"]'], 50)

onBeforeMount(() => window.scrollTo(0, 0))

onMounted(() => {
  setDefaultColors(true)
})
</script>
