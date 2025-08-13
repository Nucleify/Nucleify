<template>
  <Knob
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :size="props.size"
    :invalid="props.invalid"
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
    :aria-label="props.ariaLabel"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import type { KnobInterface } from 'atomic'

import Knob from 'primevue/knob' // Import for Storybook

const props = defineProps<KnobInterface>()
</script>
