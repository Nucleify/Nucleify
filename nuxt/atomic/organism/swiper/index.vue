<template>
  <div class="swiper-container">
    <swiper v-bind="transformProps(props, excludedProps)">
      <swiper-slide v-for="(slide, index) in props.slides" :key="index">
        <ad-anchor
          v-if="slide.url && slide.prefix && slide.image"
          :href="slide.url"
          :src="slide.prefix + slide.image"
        />
      </swiper-slide>
      <slot />
    </swiper>
  </div>
</template>

<script setup lang="ts">
import type { SwiperInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SwiperInterface>()

const excludedProps = ['slides']
</script>
