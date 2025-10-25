<template>
  <Button
    v-bind="transformProps(props, excludedProps)"
    :style="{
      width: props.width,
      gap: props.gap,
      padding: props.padding,
    }"
  >
    <ad-image v-if="props.src" :src="props.src" :alt="props.alt" />
    <ad-icon v-if="props.icon" :icon="props.icon" />
    <template v-if="props.label">{{ props.label }}</template>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'primevue' // Import for Storybook

import type { ButtonInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ButtonInterface>()

const excludedProps = [
  'alt',
  'label',
  'icon',
  'src',
  'width',
  'height',
  'gap',
  'padding',
]
</script>
