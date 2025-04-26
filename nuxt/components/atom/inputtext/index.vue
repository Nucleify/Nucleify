<template>
  <InputText
    :ad-type="props.adType"
    :v-model="props.value"
    :default-value="props.defaultValue"
    :name="props.name"
    :size="props.size"
    :invalid="props.invalid"
    :variant="props.variant"
    :fluid="props.fluid"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :disabled="props.disabled"
    :class="[{ 'p-invalid': props.invalid }]"
    :id="props.id"
    :placeholder="props.placeholder"
  />
</template>

<script setup lang="ts">
import { InputTextInterface } from '.'

const props = defineProps<InputTextInterface>()
</script>
