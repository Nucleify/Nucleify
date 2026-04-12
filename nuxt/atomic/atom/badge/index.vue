<template>
  <Badge v-bind="transformProps(props)"> <slot /> </Badge>
</template>

<script setup lang="ts">
import type { BadgeInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<BadgeInterface>()
</script>
