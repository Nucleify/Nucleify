<template>
  <InputNumber
    :ad-type="props.adType"
    :v-model="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :format="props.format"
    :show-buttons="props.showButtons"
    :button-layout="props.buttonLayout"
    :increment-button-class="props.incrementButtonClass"
    :decrement-button-class="props.decrementButtonClass"
    :increment-icon="props.incrementIcon"
    :decrement-icon="props.decrementIcon"
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
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :variant="props.variant"
    :readonly="props.readonly"
    :placeholder="props.placeholder"
    :fluid="props.fluid"
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
import type { InputNumberInterface } from 'atomic'

import InputNumber from 'primevue/inputnumber' // Import for Storybook

const props = defineProps<InputNumberInterface>()
</script>
