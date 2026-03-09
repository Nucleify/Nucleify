<template>
  <MeterGroup v-bind="transformProps(props)">
    <slot />
  </MeterGroup>
</template>

<script setup lang="ts">
import type { MeterGroupInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<MeterGroupInterface>()
</script>
