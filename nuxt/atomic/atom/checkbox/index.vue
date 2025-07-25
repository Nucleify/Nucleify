<template>
  <Checkbox
    :ad-type="props.adType"
    :value="props.value"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :binary="props.binary"
    :indeterminate="props.indeterminate"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :required="props.required"
    :tabindex="props.tabindex"
    :true-value="props.trueValue"
    :false-value="props.falseValue"
    :input-id="props.inputId"
    :input-class="props.inputClass"
    :input-style="props.inputStyle"
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
import type { CheckboxInterface } from 'atomic'

import Checkbox from 'primevue/checkbox' // Import for Storybook

const props = defineProps<CheckboxInterface>()
</script>
