<template>
  <section id="technologies">
    <div class="swiper-container">
      <client-only>
        <swiper-container ref="technologiesSwiper" class="mySwiper">
          <swiper-slide v-for="(tech, index) in data" :key="index">
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
import { isMobile, technologyRequests } from 'atomic'

let data

if (appEnv() !== 'production') {
  const { getSiteTechnologies, resultsBySite } = technologyRequests()

  onMounted(() => getSiteTechnologies('general', false))
  watchEffect(() => data = resultsBySite)
} else {
  ;({ data } = await useFetch(
    apiUrl() + 'technologies/get-site-technologies/general',
    {
      method: 'GET',
      immediate: true,
      watch: false,
    }
  ))
}

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
</script>
