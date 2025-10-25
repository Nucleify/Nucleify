<template>
  <ScrollTop v-bind="transformProps(props, excludedProps)" />
</template>
<script setup lang="ts">
import { ScrollTop } from 'primevue' // Import for Storybook

import type { ScrollTopInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ScrollTopInterface>()

const excludedProps: string[] = []
</script>
