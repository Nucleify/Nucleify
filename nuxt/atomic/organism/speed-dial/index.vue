<template>
  <SpeedDial
    :model="props.model"
    :visible="props.visible"
    :direction="props.direction"
    :transition-delay="props.transitionDelay"
    :type="props.type"
    :radius="props.radius"
    :mask="props.mask"
    :disabled="props.disabled"
    :hide-on-click-outside="props.hideOnClickOutside"
    :button-class="props.buttonClass"
    :mask-style="props.maskStyle"
    :show-icon="props.showIcon"
    :hide-icon="props.hideIcon"
    :rotate-animation="props.rotateAnimation"
    :tooltip-options="props.tooltipOptions"
    :button-props="props.buttonProps"
    :action-button-props="props.actionButtonProps"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import type { SpeedDialInterface } from 'atomic'

const props = defineProps<SpeedDialInterface>()
</script>
