<template>
  <InputOtp
    :ad-type="props.adType"
    :v-model="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :size="props.size"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :variant="props.variant"
    :tabindex="props.tabindex"
    :length="props.length"
    :mask="props.mask"
    :integer-only="props.integerOnly"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import type { InputOtpInterface } from 'atomic'

import InputOtp from 'primevue/inputotp' // Import for Storybook

const props = defineProps<InputOtpInterface>()
</script>
