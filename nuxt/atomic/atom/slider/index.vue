<template>
  <Slider
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :orientation="props.orientation"
    :step="props.step"
    :range="props.range"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :tabindex="props.tabindex"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { SliderInterface } from 'atomic'

const props = defineProps<SliderInterface>()
</script>
