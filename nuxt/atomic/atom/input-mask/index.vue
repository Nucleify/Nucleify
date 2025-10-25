<template>
  <InputMask v-bind="transformProps(props, excludedProps)" />
</template>

<script setup lang="ts">
import { InputMask } from 'primevue' // Import for Storybook

import type { InputMaskInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputMaskInterface>()

const excludedProps: string[] = []
</script>
