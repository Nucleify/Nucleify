<template>
  <Rating v-bind="transformProps(props)" />
</template>
<script setup lang="ts">
import { Rating } from 'primevue' // Import for Storybook

import type { RatingInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RatingInterface>()
</script>
