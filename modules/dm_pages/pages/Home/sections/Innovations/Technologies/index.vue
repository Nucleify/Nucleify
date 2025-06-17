<template>
  <section id="technologies">
    <div class="swiper-container">
      <client-only>
        <swiper-container ref="technologiesSwiper" class="mySwiper">
          <swiper-slide v-for="(tech, index) in data" :key="index">
            <ad-anchor
              v-if="tech"
              v-tooltip="tech.label"
              :href="tech.href"
              :aria-label="tech.label"
            >
              <nuxt-img
                :src="technologiesImgUrl + tech.src"
                :alt="tech.label"
                loading="lazy"
              />
            </ad-anchor>
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
  watchEffect(() => (data = resultsBySite))
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
