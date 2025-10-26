<template>
  <SelectButton v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { SelectButton } from 'primevue' // Import for Storybook

import type { SelectButtonInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SelectButtonInterface>()
</script>
