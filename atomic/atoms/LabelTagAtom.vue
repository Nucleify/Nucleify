<template>
    <label
        :for="forInput"
    >
        {{ label }}
    </label>
</template>

<script setup lang="ts">
import { LabelTagInterface } from 'atomic/bosons/types'

defineProps<LabelTagInterface>()
</script>
