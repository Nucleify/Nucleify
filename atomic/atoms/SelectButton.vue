<template>
  <SelectButton
    :ad-type="props.adType"
    :model-value="props.modelValue"
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
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { SelectButtonInterface } from 'atomic/bosons/types'

const props = defineProps<SelectButtonInterface>()
</script>
