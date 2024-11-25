<template>
  <Slider
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :min="props.min"
    :max="props.max"
    :orientation="props.orientation"
    :step="props.step"
    :range="props.range"
    :disabled="props.disabled"
    :tabindex="props.tabindex"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { SliderInterface } from 'atomic/bosons/types'

const props = defineProps<SliderInterface>()
</script>
