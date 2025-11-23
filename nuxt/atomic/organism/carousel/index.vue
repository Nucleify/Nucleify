<template>
  <Carousel v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { CarouselInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<CarouselInterface>()
</script>
