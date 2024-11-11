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

import { isMobile, useColors, useViewportChange } from 'atomic/bosons/utils'

import {
  HomeFooter,
  HomeNavbar,
  Features,
  Innovations,
  Start,
  WhyUs,
} from './Sections'

const { setDefaultColors } = useColors()

useViewportChange(
  [
    '.home-charts-container',
    '#access',
    '#structure',
    '#technologies',
    '#why-us',
    '#footer',
  ],
  isMobile() ? 250 : 100
)

onBeforeMount(() => window.scrollTo(0, 0))

onMounted(() => {
  setDefaultColors(true)
})
</script>
