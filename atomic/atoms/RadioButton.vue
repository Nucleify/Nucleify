<template>
    <RadioButton :value="value" :input-id="inputId" :v-type="type" />
</template>

<script setup lang="ts">
import { RadioButtonInterface } from 'atomic/bosons/types'

defineProps<RadioButtonInterface>()
</script>
