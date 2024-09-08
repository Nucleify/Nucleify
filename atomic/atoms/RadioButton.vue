<template>
    <RadioButton
        :value="value"
        :input-id="inputId"
        :class="'p-radiobutton-' + type"
    />
</template>

<script setup lang="ts">
import { RadioButtonInterface } from 'atomic/bosons/types'

defineProps<RadioButtonInterface>()
</script>
