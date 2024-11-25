<template>
  <InputText
    :ad-type="props.adType"
    :v-model="props.value"
    :size="props.size"
    :invalid="props.invalid"
    :variant="props.variant"
    :disabled="props.disabled"
    :unstyled="props.unstyled"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :class="[{ 'p-invalid': props.invalid }]"
    :id="props.id"
  />
</template>

<script setup lang="ts">
import { InputTextInterface } from 'atomic/bosons/types'

const props = defineProps<InputTextInterface>()
</script>
