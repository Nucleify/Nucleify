<template>
  <Checkbox v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { Checkbox } from 'primevue' // Import for Storybook

import type { CheckboxInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<CheckboxInterface>()

const excludedProps: string[] = []
</script>
