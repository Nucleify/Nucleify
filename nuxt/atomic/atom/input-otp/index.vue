<template>
  <InputOtp v-bind="transformProps(props)" />
</template>
<script setup lang="ts">
import { InputOtp } from 'primevue' // Import for Storybook

import type { InputOtpInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<InputOtpInterface>()
</script>
