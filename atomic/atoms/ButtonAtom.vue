<template>
    <Button
        @click="onclick"
        :severity="severity"
        :disabled="disabled"
        :raised="raised"
        :rounded="rounded"
        :text="text"
        :outlined="outlined"
        :style="{
            gap: gap,
            padding: padding,
        }"
        :icon="icon"
        :label="label"
    />
</template>

<script setup lang="ts">
import { ButtonInterface } from 'atomic/bosons/types'

defineProps<ButtonInterface>()
</script>
