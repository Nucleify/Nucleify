<template>
  <Slider v-bind="transformProps(props)">
    <slot />
  </Slider>
</template>

<script setup lang="ts">
import type { SliderInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SliderInterface>()
</script>
