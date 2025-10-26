<template>
  <InputText
    v-bind="transformProps(props)"
    :class="[{ 'p-invalid': props.invalid }]"
  />
</template>

<script setup lang="ts">
import { InputText } from 'primevue' // Import for Storybook

import type { InputTextInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputTextInterface>()
</script>
