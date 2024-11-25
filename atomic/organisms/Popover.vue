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
    :show-close-icon="props.showCloseIcon"
    :append-to="props.appendTo"
    :base-z-index="props.baseZIndex"
    :auto-z-index="props.autoZIndex"
    :breakpoints="props.breakpoints"
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

import { PopoverInterface } from 'atomic/bosons/types'

const props = defineProps<PopoverInterface>()

const pop = ref()

const toggle = (event) => {
  pop.value.toggle(event)
}
</script>
