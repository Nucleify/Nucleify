<template>
  <ad-button
    @click="toggle"
    :icon="props.popoverClass!.includes('terminal') ? 'pi pi-code' : props.icon"
    :src="props.src"
    :class="props.buttonClass"
    :style="props.buttonStyle"
    ad-type="main"
    rounded
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
    :closeOnEscape="props.closeOnEscape"
    :class="props.popoverClass"
  >
    <slot />
  </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { PopoverInterface } from 'atomic'

const props = defineProps<PopoverInterface>()

const pop = ref()

// eslint-disable-next-line
const toggle = (event: any) => {
  pop.value.toggle(event)
}
</script>
