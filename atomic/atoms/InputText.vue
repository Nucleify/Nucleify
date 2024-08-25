<template>
    <InputText
        :class="[{ 'p-invalid': invalid }]"
        :v-model="value"
        :id="id"
        :type="type"
        :disabled="disabled"
        :unstyled="unstyled"
        :size="size"
    />
</template>

<script setup lang="ts">
import { InputTextInterface } from 'atomic/bosons/types'

defineProps<InputTextInterface>()
</script>
