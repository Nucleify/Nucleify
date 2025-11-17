<template>
  <Knob v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { Knob } from 'primevue' // Import for Storybook

import type { KnobInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<KnobInterface>()
</script>
