<template>
  <ColorPicker
    :model-value="props.modelValue"
    @update:model-value="onUpdateModelValue"
    :ad-type="props.adType"
    :default-color="props.defaultColor"
    :default-value="props.defaultValue"
    :name="props.name"
    :inline="props.inline"
    :format="props.format"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :tabindex="props.tabindex"
    :auto-z-index="props.autoZIndex"
    :base-z-index="props.baseZIndex"
    :input-id="props.inputId"
    :overlay-class="props.overlayClass"
    :append-to="props.appendTo"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { ColorPickerInterface } from 'atomic'

const props = defineProps<ColorPickerInterface>()
const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue(value: string) {
  emit('update:modelValue', value)
}
</script>
