<template>
  <ColorPicker
    :ad-type="props.adType"
    v-model="itemColor"
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
import { watchEffect } from 'vue'

import { ColorPickerInterface } from 'atomic/bosons/types'
import { setColorsVariables, useColorPicker } from 'atomic/bosons/utils'

const props = defineProps<ColorPickerInterface>()

const { itemColor, setColorValues } = useColorPicker(props.adType!)

watchEffect(() => {
  setColorValues()
  setColorsVariables()
})
</script>
