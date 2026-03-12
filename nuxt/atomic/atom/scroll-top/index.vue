<template>
  <ScrollTop v-bind="transformProps(props)">
    <slot />
  </ScrollTop>
</template>

<script setup lang="ts">
import type { ScrollTopInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ScrollTopInterface>()
</script>
