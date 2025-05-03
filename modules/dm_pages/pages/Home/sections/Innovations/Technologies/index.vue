<template>
  <section id="technologies">
    <div class="swiper-container">
      <client-only>
        <swiper-container ref="technologiesSwiper" class="mySwiper">
          <swiper-slide v-for="(tech, index) in resultsBySite" :key="index">
            <molecule-anchor
              v-if="tech"
              :href="tech.href"
              :src="technologiesImgUrl + tech.src"
              v-tooltip="tech.label"
            />
          </swiper-slide>
        </swiper-container>
      </client-only>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { technologiesImgUrl } from '#imports'

import { isMobile, technologyRequests } from 'atomic'

const { getSiteTechnologies, resultsBySite } = technologyRequests()

const technologiesSwiper = ref(null)

useSwiper(technologiesSwiper, {
  direction: 'horizontal',
  spaceBetween: isMobile() ? 30 : 50,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  slidesPerView: 12,
  slidesPerGroup: 2,
  loop: true,
})

onMounted(() => {
  getSiteTechnologies('general', false)
})
</script>
