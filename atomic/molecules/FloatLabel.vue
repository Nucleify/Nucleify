<template>
    <FloatLabel :unstyled="unstyled">
        <slot>
            <!-- Example use
                <input-text-atom :id="" v-model="" />
                <label-tag-atom label="" for="" />
            -->
        </slot>
    </FloatLabel>
</template>

<script setup lang="ts">
import { FloatLabelInterface } from 'atomic/bosons/types'

defineProps<FloatLabelInterface>()
</script>
