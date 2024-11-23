<template>
  <section id="technologies">
    <div class="swiper-container">
      <ad-swiper
        :slides="technologies"
        :spaceBetween="30"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :modules="modules"
        :slides-per-view="9"
        :loop="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { technologies } from 'atomic/bosons/constants'

const modules = [Autoplay]
</script>
