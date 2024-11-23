<template>
  <Checkbox
    :value="props.value"
    :model-value="props.modelValue"
    :name="props.name"
    :binary="props.binary"
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
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { CheckboxInterface } from 'atomic/bosons/types'

const props = defineProps<CheckboxInterface>()
</script>
