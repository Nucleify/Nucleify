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
            width: width,
            gap: gap,
            padding: padding,
        }"
        :icon="icon"
        :label="label"
        :type="type"
        :v-type="type"
    />
</template>

<script setup lang="ts">
import { ButtonInterface } from 'atomic/bosons/types'

defineProps<ButtonInterface>()
</script>
