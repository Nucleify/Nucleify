<template>
  <InputText
    v-bind="transformProps(props)"
    :class="[$style['ad-inputtext'], { 'p-invalid': props.invalid }]"
  />
</template>

<script setup lang="ts">
import { InputText } from 'primevue' // Import for Storybook

import type { InputTextInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputTextInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>