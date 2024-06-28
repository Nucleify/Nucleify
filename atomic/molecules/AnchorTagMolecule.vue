<template>
    <a :href="href" :rel="rel" :target="target">
        <slot>
            <i v-if="icon" :class="icon"></i>
            <label v-if="label" :style="{ cursor: 'pointer' }">{{ label }}</label>
        </slot>
    </a>
</template>

<script setup lang="ts">
import { AnchorTagInterface } from 'atomic/bosons/types'

defineProps<AnchorTagInterface>()
</script>
