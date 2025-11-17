<template>
  <ad-button
    :icon="props.icon"
    :src="props.src"
    :class="[
      props.buttonClass,
      $style['ad-popover-toggle'],
      $style[props.position!],
    ]"
    :style="props.buttonStyle"
    rounded
    @click="toggle"
  />

  <Popover
    ref="adPopover"
    v-bind="transformProps(props, excludedProps)"
    :class="[
      props.popoverClass,
      $style['ad-popover'],
      $style[props.position!],
    ]"
  > 
    <slot />
  </Popover>
</template>

<script setup lang="ts">
import type { PopoverInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<PopoverInterface>()

const excludedProps = [
  'src',
  'buttonClass',
  'buttonStyle',
  'popoverClass',
  'icon',
]

const adPopover = ref()

const toggle = (event: unknown) => {
  adPopover.value.toggle(event)
}
</script>

<style lang="scss" module>
@import 'index';
</style>