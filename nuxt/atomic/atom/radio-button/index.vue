<template>
  <RadioButton
    :ad-type="props.adType"
    :value="props.value"
    :default-value="props.defaultValue"
    :name="props.name"
    :binary="props.binary"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :tabindex="props.tabindex"
    :input-id="props.inputId"
    :input-style="props.inputStyle"
    :input-class="props.inputClass"
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
import type { RadioButtonInterface } from 'atomic'

import RadioButton from 'primevue/radiobutton' // Import for Storybook

const props = defineProps<RadioButtonInterface>()
</script>
