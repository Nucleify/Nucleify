<template>
  <InputNumber v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { InputNumber } from 'primevue' // Import for Storybook

import type { InputNumberInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputNumberInterface>()

const excludedProps: string[] = []
</script>
