<template>
  <Button
    v-bind="transformProps(props, excludedProps)"
    :style="{
      width: props.width,
      gap: props.gap,
      padding: props.padding,
    }"
    :class="[
      $style['ad-button'],
      props.media && $style[props.media + '-button'],
      props.variant && $style[props.variant + '-button'],
      props.rounded && $style['rounded-button'],
      props.severity === 'primary' && $style['primary-button'],
    ]"
  >
    <ad-image v-if="props.src" :src="props.src" :alt="props.alt" />
    <ad-icon v-if="props.icon" :icon="props.icon" />
    <template v-if="props.label">{{ $t(props.label, props.label) }}</template>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'primevue' // Import for Storybook

import type { ButtonInterface } from '.'

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

<style lang="scss" module>
@import 'index';
</style>