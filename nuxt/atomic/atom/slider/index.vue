<template>
  <Slider v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Slider } from 'primevue' // Import for Storybook

import type { SliderInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SliderInterface>()
</script>
