<template>
  <slot name="trigger" :toggle="toggle">
    <ad-button
      v-if="props.icon || props.buttonText || props.src"
      :label="props.buttonText"
      :icon="props.icon"
      :src="props.src"
      :class="[
        props.buttonClass,
        $style['ad-popover-toggle'],
        $style[props.position!],
        props.position
      ]"
      :style="props.buttonStyle"
      rounded
      @click="toggle"
    />
  </slot>

  <Popover
    ref="adPopover"
    v-bind="popoverBindings"
    :class="[
      props.popoverClass,
      $style['ad-popover'],
      $style[props.position!],
      props.position
    ]"
  >
    <slot />
  </Popover>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

import type { PopoverInterface } from '.'

import { transformProps } from '../../boson/transform_props'

defineOptions({ inheritAttrs: false })

const props = defineProps<PopoverInterface>()
const attrs = useAttrs()

const excludedProps = [
  'src',
  'buttonClass',
  'buttonStyle',
  'popoverClass',
  'icon',
]

const popoverBindings = computed(() => ({
  ...transformProps(props, excludedProps),
  ...attrs,
}))

const adPopover = ref()

const toggle = (event: unknown) => {
  adPopover.value?.toggle(event)
}
</script>

<style lang="scss" module>
@import 'index';
</style>
