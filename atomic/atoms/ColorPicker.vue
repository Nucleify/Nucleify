<template>
    <ColorPicker
        v-model="itemColor"
        :panel-class="panelClass"
        :format="format"
        :default-color="defaultColor"
        :inline="inline"
        :disabled="disabled"
        :unstyled="unstyled"
        :tabindex="tabindex"
        :auto-z-index="autoZIndex"
        :v-type="item"
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
