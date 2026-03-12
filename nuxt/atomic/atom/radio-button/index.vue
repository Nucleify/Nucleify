<template>
  <RadioButton v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { RadioButtonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RadioButtonInterface>()
</script>
