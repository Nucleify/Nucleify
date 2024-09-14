<template>
    <ColorPicker
        v-model="itemColor"
        :default-color="props.defaultColor"
        :inline="props.inline"
        :format="props.format"
        :disabled="props.disabled"
        :tabindex="props.tabindex"
        :auto-z-index="props.autoZIndex"
        :panel-class="props.panelClass"
        :append-to="props.appendTo"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        :v-type="props.item"
    />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

import { ColorPickerInterface } from 'atomic/bosons/types'
import { setColorsVariables, useColorPicker } from 'atomic/bosons/utils'

const props = defineProps<ColorPickerInterface>()

const { itemColor, setColorValues } = useColorPicker(props.item)

watchEffect(() => {
    setColorValues()
    setColorsVariables()
})
</script>
