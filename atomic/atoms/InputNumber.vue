<template>
  <InputNumber
    :v-model="props.modelValue"
    :format="props.format"
    :show-buttons="props.showButtons"
    :button-layout="props.buttonLayout"
    :increment-button-class="props.incrementButtonClass"
    :decrement-button-class="props.decrementButtonClass"
    :locale="props.locale"
    :local-matcher="props.localMatcher"
    :mode="props.mode"
    :prefix="props.prefix"
    :suffix="props.suffix"
    :currency="props.currency"
    :currency-display="props.currencyDisplay"
    :use-grouping="props.useGrouping"
    :min-fraction-digits="props.minFractionDigits"
    :max-fraction-digits="props.maxFractionDigits"
    :rounding-mode="props.roundingMode"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :allow-empty="props.allowEmpty"
    :highlight-on-focus="props.highlightOnFocus"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :placeholder="props.placeholder"
    :input-id="props.inputId"
    :input-class="props.inputClass"
    :input-style="props.inputStyle"
    :input-props="props.inputProps"
    :increment-button-props="props.incrementButtonProps"
    :decrement-button-props="props.decrementButtonProps"
    :aria-labelledby="props.ariaLabelledby"
    :aria-label="props.ariaLabel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { InputNumberInterface } from 'atomic/bosons/types'

const props = defineProps<InputNumberInterface>()
</script>
