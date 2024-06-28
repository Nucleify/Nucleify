<template>
    <a :href="href" :rel="rel" :target="target" :style="style">
        <slot>
            <i v-if="icon" :class="icon"></i>
            <label-tag-atom
                v-if="label"
                :label="label"
                :style="{ cursor: 'pointer' }"
            />
        </slot>
    </a>
</template>

<script setup lang="ts">
import { AnchorTagInterface } from 'atomic/bosons/types'

defineProps<AnchorTagInterface>()
</script>
