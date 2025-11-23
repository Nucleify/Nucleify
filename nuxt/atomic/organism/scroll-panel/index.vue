<template>
  <ScrollPanel v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { ScrollPanelInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ScrollPanelInterface>()
</script>
