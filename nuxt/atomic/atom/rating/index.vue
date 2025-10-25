<template>
  <Rating v-bind="transformProps(props, excludedProps)" />
</template>
<script setup lang="ts">
import { Rating } from 'primevue' // Import for Storybook

import type { RatingInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RatingInterface>()

const excludedProps: string[] = []
</script>
