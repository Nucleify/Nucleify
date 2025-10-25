<template>
  <Divider v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { Divider } from 'primevue' // Import for Storybook

import type { DividerInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DividerInterface>()

const excludedProps: string[] = []
</script>
