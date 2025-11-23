<template>
  <ProgressSpinner
    v-bind="transformProps(props, excludedProps)"
    :style="{ width: props.width, height: props.height }"
  />
</template>

<script setup lang="ts">
import { ProgressSpinner } from 'primevue' // Import for Storybook

import type { ProgressSpinnerInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ProgressSpinnerInterface>()

const excludedProps = ['width', 'height']
</script>
