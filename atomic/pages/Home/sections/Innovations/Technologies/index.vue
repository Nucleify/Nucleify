<template>
  <section id="technologies">
    <div class="swiper-container">
      <swiper
        :spaceBetween="30"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :modules="modules"
        class="mySwiper"
        :slides-per-view="9"
        :slides-per-group="2"
        :loop="true"
      >
        <swiper-slide v-for="(tech, index) in resultsBySite" :key="index">
          <ad-anchor
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { technologyRequests } from 'atomic'
import { onMounted } from 'vue'

const modules = [Autoplay]

const { getSiteTechnologies, resultsBySite } = technologyRequests()

onMounted(() => {
  getSiteTechnologies(true, 'general')
})
</script>
