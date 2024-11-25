<template>
  <TriStateCheckbox
    :ad-type="props.adType"
    :v-model="props.modelValue"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :tabindex="props.tabindex"
    :input-id="props.inputId"
    :input-class="props.inputClass"
    :input-style="props.inputStyle"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :pt="props.pt"
    :pt-options="ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { TriStateCheckboxInterface } from 'atomic/bosons/types'

const props = defineProps<TriStateCheckboxInterface>()
</script>
