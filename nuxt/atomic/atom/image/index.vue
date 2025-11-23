<template>
  <Image
    v-bind="transformProps(props, excludedProps)"
    :fetchpriority="props.fetchpriority || 'low'"
  />
</template>

<script setup lang="ts">
import { Image } from 'primevue' // Import for Storybook

import type { ImageInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ImageInterface>()

const excludedProps: string[] = ['fetchpriority']
</script>
