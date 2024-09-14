<template>
    <i v-if="props.icon" :class="props.icon" :v-type="props.type" />
</template>

<script setup lang="ts">
import { IconInterface } from 'atomic/bosons/types'

const props = defineProps<IconInterface>()
</script>
