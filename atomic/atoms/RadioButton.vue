<template>
    <RadioButton
        :value="props.value"
        :v-model="props.modelValue"
        :name="props.name"
        :binary="props.binary"
        :invalid="props.invalid"
        :disabled="props.disabled"
        :variant="props.variant"
        :readonly="props.readonly"
        :tabindex="props.tabindex"
        :input-id="props.inputId"
        :input-style="props.inputStyle"
        :input-class="props.inputClass"
        :aria-labelledby="props.ariaLabelledby"
        :aria-label="props.ariaLabel"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        :v-type="props.type"
    />
</template>

<script setup lang="ts">
import { RadioButtonInterface } from 'atomic/bosons/types'

const props = defineProps<RadioButtonInterface>()
</script>
