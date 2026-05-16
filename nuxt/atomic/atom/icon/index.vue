<template>
  <Icon
    v-if="props.icon?.trim()"
    v-bind="transformProps(props, excludedProps, propMap)"
  />
</template>

<script setup lang="ts">
import type { IconInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<IconInterface>()

/** `icon` must stay in the transform loop so `propMap` can emit `name` for Nuxt Icon. */
const excludedProps = ['adType']

const propMap = {
  icon: 'name',
}
</script>

<style lang="scss" module>
@import 'index';
</style>
