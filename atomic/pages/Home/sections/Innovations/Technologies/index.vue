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
        :loop="true"
      >
        <swiper-slide v-for="(tech, index) in technologies" :key="index">
          <ad-anchor
            :href="tech.url"
            :src="technologiesImgUrl + tech.image"
            v-tooltip="tech.name"
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

import { technologies } from 'atomic'

const modules = [Autoplay]
</script>
