<template>
  <Icon
    v-if="props.icon"
    v-bind="transformProps(props, excludedProps, propMap)"
  />
</template>

<script setup lang="ts">
import type { IconInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<IconInterface>()

const propMap = {
  icon: 'name',
}
</script>

<style lang="scss" module>
@import 'index';
</style>