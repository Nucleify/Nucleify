<template>
  <div class="home-container">
    <start />
    <features />
    <innovations />
    <ad-section-why-us site="home" />
    <ad-section-faq site="home" />
    <ad-section-contact />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'

import { useColors, useViewportChange } from 'atomic'

import { Features, Innovations, Start } from './'

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
