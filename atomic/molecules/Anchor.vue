<template>
    <a
        :href="props.href"
        :rel="props.rel"
        :target="props.target"
        :style="props.style"
    >
        <slot />
        <icon-atom :icon="props.icon" />
        <label-atom
            v-if="props.label"
            :label="props.label"
            :style="{ cursor: 'pointer' }"
        />
    </a>
</template>

<script setup lang="ts">
import { AnchorInterface } from 'atomic/bosons/types'

const props = defineProps<AnchorInterface>()
</script>
