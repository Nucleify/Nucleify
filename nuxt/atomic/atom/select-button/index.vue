<template>
  <SelectButton
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :options="props.options"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :option-disabled="props.optionDisabled"
    :multiple="props.multiple"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :data-key="props.dataKey"
    :allow-empty="props.allowEmpty"
    :aria-labelledby="props.ariaLabelledby"
    :size="props.size"
    :form-control="props.formControl"
    :pt="props.pt"
    :dt="props.dt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { SelectButtonInterface } from 'atomic'

import SelectButton from 'primevue/selectbutton' // Import for Storybook

const props = defineProps<SelectButtonInterface>()
</script>
