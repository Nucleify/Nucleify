<template>
  <Chips
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :max="props.max"
    :add-on-blur="props.addOnBlur"
    :allow-duplicate="props.allowDuplicate"
    :separator="props.separator"
    :input-id="props.inputId"
    :input-class="props.inputClass"
    :input-style="props.inputStyle"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :placeholder="props.placeholder"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { ChipsInterface } from 'atomic/bosons/types'

const props = defineProps<ChipsInterface>()
</script>
