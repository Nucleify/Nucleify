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
    :dismissable="props.dismissable"
    :append-to="props.appendTo"
    :base-z-index="props.baseZIndex"
    :auto-z-index="props.autoZIndex"
    :breakpoints="props.breakpoints"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :close-on-escape="props.closeOnEscape"
    :class="props.popoverClass"
  >
    <slot />
  </Popover>
</template>

<script setup lang="ts">
import type { PopoverInterface } from 'atomic'

const props = defineProps<PopoverInterface>()

const pop = ref()

const toggle = (event: unknown) => {
  pop.value.toggle(event)
}
</script>
