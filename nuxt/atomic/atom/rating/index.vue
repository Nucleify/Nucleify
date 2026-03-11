<template>
  <Rating v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { RatingInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RatingInterface>()
</script>
