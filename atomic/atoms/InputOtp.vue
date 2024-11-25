<template>
  <InputOtp
    :v-model="props.modelValue"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :variant="props.variant"
    :tabindex="props.tabindex"
    :length="props.length"
    :mask="props.mask"
    :integerOnly="props.integerOnly"
    :pt="props.pt"
    :ptOptions="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { InputOtpInterface } from 'atomic/bosons/types'

const props = defineProps<InputOtpInterface>()
</script>
