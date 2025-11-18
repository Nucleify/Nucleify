<template>
  <Divider v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Divider } from 'primevue' // Import for Storybook

import type { DividerInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<DividerInterface>()
</script>
