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
    >
        <i :class="iconClass"></i>
        <span v-if="label" :class="labelClass" class="p-button-label">{{
            label
        }}</span>
    </Button>
</template>

<script setup lang="ts">
import { ButtonInterface } from 'atomic/bosons/types'

defineProps<ButtonInterface>()
</script>
