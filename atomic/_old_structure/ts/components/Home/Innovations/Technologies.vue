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
        v-animateonscroll="{
          enterClass: 'fadein',
          leaveClass: 'fadeout',
          rootMargin: isMobile() ? '200px' : '',
        }"
      >
        <swiper-slide v-for="(tech, index) in technologies" :key="index">
          <ad-anchor :href="tech.url" :src="`/technologies/${tech.image}`" />
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

import { technologies } from 'atomic/bosons/constants'

const modules = [Autoplay]
</script>
