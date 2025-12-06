<template>
  <section id="technologies">
    <div class="swiper-container">
      <swiper-container ref="technologiesSwiper" class="mySwiper">
        <swiper-slide v-for="(tech, index) in resultsBySite" :key="index">
          <ad-anchor
            v-if="tech"
            v-tooltip="tech.label"
            :href="tech.href"
            :aria-label="tech.label"
            class="cube"
          >
            <img :src="technologiesImgUrl + tech.src" :alt="tech.label" />
          </ad-anchor>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  bounceFadeIn,
  isMobile,
  technologyRequests,
  useScrollTrigger,
} from 'atomic'

const { getSiteTechnologies, resultsBySite } = technologyRequests()

onMounted(() => getSiteTechnologies('general', false))

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

useScrollTrigger(
  '.swiper-container',
  () => {
    bounceFadeIn('.swiper-container swiper-slide', {
      delay: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
    })
  },
  {
    start: 'top 75%',
  }
)
</script>
