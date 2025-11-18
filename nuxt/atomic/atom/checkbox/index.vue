<template>
  <Checkbox v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Checkbox } from 'primevue' // Import for Storybook

import type { CheckboxInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<CheckboxInterface>()
</script>
