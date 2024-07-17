<template>
    <a :href="href" :rel="rel" :target="target" :style="style">
        <slot>
            <item-atom :icon="icon" />
            <label-atom
                v-if="label"
                :label="label"
                :style="{ cursor: 'pointer' }"
            />
        </slot>
    </a>
</template>

<script setup lang="ts">
import { AnchorInterface } from 'atomic/bosons/types'

defineProps<AnchorInterface>()
</script>
