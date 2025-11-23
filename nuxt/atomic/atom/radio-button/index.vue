<template>
  <RadioButton v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { RadioButton } from 'primevue' // Import for Storybook

import type { RadioButtonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RadioButtonInterface>()
</script>
