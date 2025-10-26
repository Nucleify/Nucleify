<template>
  <ad-button
    :icon="props.popoverClass!.includes('terminal') ? 'prime:code' : props.icon"
    :src="props.src"
    :class="props.buttonClass"
    :style="props.buttonStyle"
    ad-type="main"
    rounded
    @click="toggle"
  />

  <Popover
    ref="pop"
    v-bind="transformProps(props, excludedProps)"
    :class="props.popoverClass"
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

const pop = ref()

const toggle = (event: unknown) => {
  pop.value.toggle(event)
}
</script>
