<template>
  <InputMask v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import { InputMask } from 'primevue' // Import for Storybook

import type { InputMaskInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputMaskInterface>()
</script>
