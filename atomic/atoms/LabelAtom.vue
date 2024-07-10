<template>
    <label :for="forInput">
        {{ label }}
    </label>
</template>

<script setup lang="ts">
import { LabelInterface } from 'atomic/bosons/types'

defineProps<LabelInterface>()
</script>
