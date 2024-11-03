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

import {
  HomeFooter,
  HomeNavbar,
  Features,
  Innovations,
  Start,
  WhyUs,
} from './Sections'

import { useColors } from 'atomic/bosons/utils'

const { setDefaultColors } = useColors()

onBeforeMount(() => window.scrollTo(0, 0))
onMounted(() => {
  setDefaultColors(true)
})
</script>
