<template>
    <RadioButton :value="value" :inputId="inputId" />
</template>

<script setup lang="ts">
import { RadioButtonInterface } from 'atomic/bosons/types'

defineProps<RadioButtonInterface>()
</script>
