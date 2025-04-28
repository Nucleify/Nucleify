<template>
  <section id="technologies">
    <div class="swiper-container">
      <swiper
        :spaceBetween="30"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        class="mySwiper"
        :slides-per-view="9"
        :slides-per-group="2"
        :loop="true"
      >
        <swiper-slide v-for="(tech, index) in resultsBySite" :key="index">
          <molecule-anchor
            :href="tech.href"
            :src="technologiesImgUrl + tech.src"
            v-tooltip="tech.label"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { technologyRequests } from 'atomic'

const { getSiteTechnologies, resultsBySite } = technologyRequests()

onMounted(() => {
  getSiteTechnologies(true, 'general')
})
</script>
