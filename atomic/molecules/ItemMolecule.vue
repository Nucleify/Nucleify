<template>
    <i v-if="icon" :class="icon" class="dockIcon" />
</template>

<script setup lang="ts">
import { ItemInterface } from 'atomic/bosons/types'

defineProps<ItemInterface>()
</script>
