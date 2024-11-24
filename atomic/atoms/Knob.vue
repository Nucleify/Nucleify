<template>
  <Knob
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :size="props.size"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :step="props.step"
    :min="props.min"
    :max="props.max"
    :value-color="props.valueColor"
    :range-color="props.rangeColor"
    :text-color="props.textColor"
    :stroke-width="props.strokeWidth"
    :show-value="props.showValue"
    :value-template="props.valueTemplate"
    :tabindex="props.tabindex"
    :aria-labelledby="props.ariaLabelledby"
    :ariaLabel="props.ariaLabel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { KnobInterface } from 'atomic/bosons/types'

const props = defineProps<KnobInterface>()
</script>
