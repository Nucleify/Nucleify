<template>
  <ProgressBar
    v-bind="transformProps(props, excludedProps)"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<script setup lang="ts">
import { ProgressBar } from 'primevue' // Import for Storybook

import type { ProgressBarInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ProgressBarInterface>()

const excludedProps = ['width', 'height']
</script>
