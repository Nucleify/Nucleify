<template>
  <span
    v-if="props.icon && props.storybook"
    :class="[
      getPrimeIconClass(props.icon, props.storybook),
      $style['prime-icon'],
    ]"
    :style="{ fontSize: props.size }"
  />
  <Icon
    v-else-if="props.icon"
    v-bind="transformProps(props, excludedProps, propMap)"
  />
</template>

<script setup lang="ts">
import type { IconInterface } from '.'

import { transformProps } from '../../boson/transform_props'
import { getPrimeIconClass } from './utils'

const props = defineProps<IconInterface>()

const excludedProps = ['storybook']

const propMap = {
  icon: 'name',
}
</script>

<style lang="scss" module>
@import 'index';
</style>