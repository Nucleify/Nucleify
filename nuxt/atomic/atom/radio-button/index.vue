<template>
  <RadioButton v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { RadioButton } from 'primevue' // Import for Storybook

import type { RadioButtonInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RadioButtonInterface>()

const excludedProps: string[] = []
</script>
